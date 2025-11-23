# Railway Deployment Guide

## Quick Deploy via Railway Dashboard

Since Railway CLI requires browser authentication, the easiest way to deploy is through the Railway dashboard:

### Step 1: Deploy Backend

1. Go to https://railway.app/new
2. Click **"Deploy from GitHub repo"**
3. Select your **attendo** repository
4. Railway will detect the `server` directory
5. Click **"Add PostgreSQL"** to create a database
6. Railway will automatically:
   - Set `DATABASE_URL` environment variable
   - Run `npx prisma migrate deploy`
   - Start your backend server

### Step 2: Configure Environment Variables

In Railway dashboard, go to your backend service → Variables:

- `NODE_ENV` = `production`
- `PORT` = `3001` (or leave default)
- `FRONTEND_URL` = `https://your-frontend-url.railway.app` (set after frontend deploys)
- `ALLOWED_ORIGINS` = (optional, comma-separated list)

### Step 3: Deploy Frontend

1. In Railway dashboard, click **"New"** → **"GitHub Repo"**
2. Select the same **attendo** repository
3. Set **Root Directory** to `client`
4. Railway will auto-detect Vite/React
5. Set environment variable:
   - `VITE_API_URL` = `https://your-backend-url.railway.app`

### Step 4: Get URLs

After deployment:
- Backend URL: `https://your-backend-service.railway.app`
- Frontend URL: `https://your-frontend-service.railway.app`

### Step 5: Update CORS

Update `FRONTEND_URL` in backend service with the actual frontend URL.

## Alternative: Railway CLI (Browser Login Required)

If you prefer CLI:

```bash
# Login (opens browser)
railway login

# Initialize project
railway init

# Add PostgreSQL
railway add

# Deploy backend
cd server
railway up

# Deploy frontend (new service)
cd ../client
railway up
```

## Railway Token Usage

The token you provided can be used via Railway API or set as environment variable:

```bash
export RAILWAY_TOKEN="your-token-here"
railway whoami
```

However, for initial setup, browser login is recommended.

## Troubleshooting

- **Database connection issues**: Ensure `DATABASE_URL` is set automatically by Railway PostgreSQL service
- **CORS errors**: Make sure `FRONTEND_URL` matches your frontend Railway URL
- **Build failures**: Check Railway logs in dashboard
- **Migration errors**: Ensure Prisma migrations are in `server/prisma/migrations/`

## Next Steps

After deployment:
1. Test the API: `https://your-backend.railway.app/health`
2. Test frontend: Visit your frontend URL
3. Add custom domain (optional) in Railway dashboard
4. Monitor logs in Railway dashboard

