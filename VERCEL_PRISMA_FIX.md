# Fixing Prisma Generation on Vercel

## Problem
Vercel caches `node_modules`, so Prisma Client doesn't get regenerated even with `postinstall` scripts.

## Solution Applied

### 1. Updated `package.json`
- Added `engines.node: "18.x"` to specify Node.js version
- Added `vercel-build` script that runs `prisma generate`
- Kept `postinstall` script as backup

### 2. Updated `vercel.json`
- Changed build command to `npm run vercel-build`
- This ensures Prisma generates during the build phase

## Why This Works

1. **`vercel-build` script**: Vercel specifically looks for this script and runs it during build
2. **`postinstall` script**: Runs after `npm install` as a backup
3. **`build` script**: Also runs `prisma generate` for consistency
4. **Node.js version**: Specified in `engines` ensures compatibility

## Deployment Steps

1. **Commit and push**:
   ```bash
   git add package.json vercel.json
   git commit -m "Fix Prisma generation for Vercel"
   git push
   ```

2. **In Vercel Dashboard**:
   - Go to **Settings** → **General** → **Build & Development Settings**
   - **Clear Build Cache** (important!)
   - Verify Build Command shows: `npm run vercel-build` (or leave empty to use vercel.json)
   - **Redeploy**

3. **Check Build Logs**:
   After redeploy, check the build logs. You should see:
   ```
   Running "prisma generate"
   ✔ Generated Prisma Client
   ```

## If Still Not Working

### Option 1: Set Build Command in Dashboard
1. Go to Vercel Dashboard → Settings → General
2. Under "Build & Development Settings"
3. Set **Build Command** to: `npm install && prisma generate`
4. Leave everything else empty/default
5. Clear cache and redeploy

### Option 2: Use Environment Variable
Add to Vercel Environment Variables:
- `PRISMA_GENERATE_DATAPROXY=false`

### Option 3: Check Build Logs
Look for these in build logs:
- `Running "prisma generate"` - should appear
- `Generated Prisma Client` - confirms success
- If you don't see these, the build command isn't running

## Verification

After deployment, check the function logs. If you still see the Prisma error:
1. The build command didn't run
2. Prisma generate failed silently
3. Build cache needs to be cleared

The key is ensuring `prisma generate` runs **during the build**, not just after install.

