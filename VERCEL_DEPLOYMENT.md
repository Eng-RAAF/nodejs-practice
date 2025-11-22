# Vercel Deployment Guide

## Prisma Setup for Vercel

This project is configured to work with Vercel. The following changes ensure Prisma Client is generated during the build:

### Changes Made:

1. **`package.json`**:
   - Added `build` script: `prisma generate`
   - Added `postinstall` script: `prisma generate` (runs after npm install)
   - Moved `prisma` from `devDependencies` to `dependencies` (required for Vercel)

2. **`vercel.json`**:
   - Configured build command to run `npm run build`
   - Set Node.js runtime to 18.x

## Environment Variables

Make sure to set the following environment variables in your Vercel project settings:

1. Go to your Vercel project → Settings → Environment Variables
2. Add: `DATABASE_URL` with your PostgreSQL connection string

Example:
```
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
```

## Deployment Steps

1. **Push your code to GitHub** (if not already done)
2. **Connect to Vercel**:
   - Import your GitHub repository
   - Vercel will automatically detect the configuration

3. **Set Environment Variables**:
   - Add `DATABASE_URL` in Vercel project settings

4. **Deploy**:
   - Vercel will automatically:
     - Run `npm install` (which triggers `postinstall` → `prisma generate`)
     - Run `npm run build` (which also runs `prisma generate`)
     - Deploy your application

## Troubleshooting

If you still get Prisma errors:

1. **Check Build Logs**: Look for "prisma generate" in the build output
2. **Verify Environment Variables**: Make sure `DATABASE_URL` is set correctly
3. **Check Prisma Version**: Ensure `@prisma/client` and `prisma` versions match
4. **Clear Vercel Cache**: In Vercel dashboard → Settings → Clear Build Cache

## Database Migrations

For production, run migrations before deploying:

```bash
# Locally, create a migration
npx prisma migrate dev --name production

# Then push to production database
npx prisma migrate deploy
```

Or use `prisma db push` for development (not recommended for production).

