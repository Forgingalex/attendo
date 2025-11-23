import { Request, Response, NextFunction } from 'express';

export const validateSignIn = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Name is required and must be a string' });
  }

  const trimmedName = name.trim();
  if (trimmedName.length === 0) {
    return res.status(400).json({ error: 'Name cannot be empty' });
  }

  if (trimmedName.length > 255) {
    return res.status(400).json({ error: 'Name must be 255 characters or less' });
  }

  // Sanitize: remove potentially dangerous characters
  const sanitizedName = trimmedName.replace(/[<>\"']/g, '');
  
  req.body.name = sanitizedName;
  next();
};

export const validateSignOut = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Name is required and must be a string' });
  }

  const trimmedName = name.trim();
  if (trimmedName.length === 0) {
    return res.status(400).json({ error: 'Name cannot be empty' });
  }

  const sanitizedName = trimmedName.replace(/[<>\"']/g, '');
  
  req.body.name = sanitizedName;
  next();
};


