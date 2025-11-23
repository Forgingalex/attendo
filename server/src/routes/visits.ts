import { Router, Request, Response } from 'express';
import prisma from '../config/database';
import logger from '../utils/logger';
import { validateSignIn, validateSignOut } from '../middleware/validation';

const router = Router();

// POST /api/visits/signin
router.post('/signin', validateSignIn, async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    // Check if user is already signed in
    const existingActiveVisit = await prisma.visit.findFirst({
      where: {
        name: name,
        status: 'in',
      },
    });

    if (existingActiveVisit) {
      return res.status(400).json({
        error: 'You are already signed in',
        visit: existingActiveVisit,
      });
    }

    // Create new visit
    const visit = await prisma.visit.create({
      data: {
        name: name,
        status: 'in',
        time_in: new Date(),
      },
    });

    logger.info(`Sign in: ${name} at ${visit.time_in.toISOString()}`);

    res.status(201).json({
      message: 'Successfully signed in',
      visit: {
        id: visit.id,
        name: visit.name,
        time_in: visit.time_in,
        status: visit.status,
      },
    });
  } catch (error) {
    logger.error('Sign in error:', error);
    res.status(500).json({ error: 'Failed to sign in' });
  }
});

// POST /api/visits/signout
router.post('/signout', validateSignOut, async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    // Find active visit
    const activeVisit = await prisma.visit.findFirst({
      where: {
        name: name,
        status: 'in',
      },
      orderBy: {
        time_in: 'desc',
      },
    });

    if (!activeVisit) {
      return res.status(404).json({
        error: 'No active visit found for this name',
      });
    }

    // Update visit with sign out
    const updatedVisit = await prisma.visit.update({
      where: {
        id: activeVisit.id,
      },
      data: {
        status: 'out',
        time_out: new Date(),
      },
    });

    logger.info(`Sign out: ${name} at ${updatedVisit.time_out?.toISOString()}`);

    res.status(200).json({
      message: 'Successfully signed out',
      visit: {
        id: updatedVisit.id,
        name: updatedVisit.name,
        time_in: updatedVisit.time_in,
        time_out: updatedVisit.time_out,
        status: updatedVisit.status,
      },
    });
  } catch (error) {
    logger.error('Sign out error:', error);
    res.status(500).json({ error: 'Failed to sign out' });
  }
});

// GET /api/visits/active
router.get('/active', async (req: Request, res: Response) => {
  try {
    const activeVisits = await prisma.visit.findMany({
      where: {
        status: 'in',
      },
      orderBy: {
        time_in: 'desc',
      },
      select: {
        id: true,
        name: true,
        time_in: true,
        status: true,
      },
    });

    res.status(200).json({
      count: activeVisits.length,
      visits: activeVisits,
    });
  } catch (error) {
    logger.error('Get active visits error:', error);
    res.status(500).json({ error: 'Failed to fetch active visits' });
  }
});

// GET /api/visits/recent
router.get('/recent', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const recentVisits = await prisma.visit.findMany({
      where: {
        status: 'out',
        time_out: {
          not: null,
        },
      },
      orderBy: {
        time_out: 'desc',
      },
      take: Math.min(limit, 100), // Cap at 100
      select: {
        id: true,
        name: true,
        time_in: true,
        time_out: true,
        status: true,
      },
    });

    res.status(200).json({
      count: recentVisits.length,
      visits: recentVisits,
    });
  } catch (error) {
    logger.error('Get recent visits error:', error);
    res.status(500).json({ error: 'Failed to fetch recent visits' });
  }
});

export default router;


