# Deployment Guide

## Railway Deployment

This project is configured for deployment on Railway.app.

### Prerequisites

- Railway account (https://railway.app)
- Railway CLI installed: `npm i -g @railway/cli`

### Deployment Steps

1. **Login to Railway:**
   ```bash
   railway login
   ```

2. **Initialize Railway project:**
   ```bash
   railway init
   ```

3. **Create PostgreSQL database:**
   ```bash
   railway add postgresql
   ```

4. **Set environment variables:**
   ```bash
   railway variables set NODE_ENV=production
   railway variables set PORT=3001
   railway variables set FRONTEND_URL=https://your-frontend-url.com
   ```

5. **Deploy backend:**
   ```bash
   cd server
   railway up
   ```

6. **Deploy frontend (separate service):**
   ```bash
   cd client
   railway up
   ```

### Environment Variables

Required environment variables:
- `DATABASE_URL` - Automatically set by Railway PostgreSQL service
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Set to `production`
- `FRONTEND_URL` - Frontend URL for CORS
- `ALLOWED_ORIGINS` - Comma-separated list of allowed origins (optional)

### Railway Dashboard

After deployment, you can:
- View logs in Railway dashboard
- Manage environment variables
- Scale services
- View metrics

### Custom Domain

1. Go to Railway dashboard
2. Select your service
3. Go to Settings → Domains
4. Add your custom domain
5. Railway will provide SSL automatically

