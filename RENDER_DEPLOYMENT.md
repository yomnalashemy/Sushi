# Render Deployment Guide

## Quick Fix for "Blocked request" Error

If you see the error: `Blocked request. This host ("sushi-zj20.onrender.com") is not allowed.`

### Solution 1: Use Production Build (Recommended)

The error occurs because you're trying to use Vite's development server in production. Use the production build instead:

1. **Build Command**: `npm install`
2. **Start Command**: `npm run deploy`

This will:
- Install dependencies
- Build the project for production
- Start the static server

### Solution 2: Manual Configuration

If you prefer manual setup:

1. **Build Command**: `npm install && npm run build`
2. **Start Command**: `npm run start:static`

### Solution 3: Environment Variables

Add these environment variables in Render:
- `NODE_ENV`: `production`
- `PORT`: `10000` (or let Render set it automatically)

## Deployment Files

- `render.yaml`: Automatic configuration
- `server-static.js`: Lightweight static server
- `deploy.js`: Deployment script with build verification
- `vite.config.js`: Updated with allowed hosts

## Troubleshooting

### Build Issues
- Check that `npm install` completes successfully
- Verify `dist` folder is created after build
- Ensure all assets are copied to `dist/assets/`

### Server Issues
- Port binding: Server now binds to `0.0.0.0`
- CORS: Headers added for Render compatibility
- Health checks: Added `/` as health check path

### Asset Issues
- All images should be in `dist/assets/`
- CSS and JS files should be in `dist/assets/`
- HTML files should be in `dist/` and `dist/public/`

## Verification

After deployment, check:
1. ✅ Homepage loads with styles
2. ✅ Images display correctly
3. ✅ Navigation works between pages
4. ✅ Cart functionality works
5. ✅ All pages are accessible

## Alternative Deployment

If Render continues to have issues, consider:
- **Vercel**: Push to GitHub and connect to Vercel
- **Netlify**: Deploy the `dist` folder directly
- **GitHub Pages**: Deploy static files from `dist` 