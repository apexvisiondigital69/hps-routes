# Deployment Guide

Production deployment to Vercel + Supabase.

## Pre-Deployment Checklist

- [ ] Supabase project created and configured
- [ ] Database migrations applied
- [ ] At least one admin user created
- [ ] Environment variables ready
- [ ] Code pushed to Git repository
- [ ] (Optional) Google Maps API key configured

## Deploy to Vercel

### 1. Import Project

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. Import your Git repository
4. Select **door-to-door-app** as root directory (if in a monorepo)

### 2. Configure Build Settings

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 3. Add Environment Variables

Click **Environment Variables** and add:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
GOOGLE_MAPS_API_KEY=your-google-maps-key (optional)
```

**Important**:
- Make sure to add these for all environments (Production, Preview, Development)
- The `GOOGLE_MAPS_API_KEY` should NOT have the `NEXT_PUBLIC_` prefix (it's server-side only)

### 4. Deploy

Click **Deploy** and wait 2-3 minutes.

## Post-Deployment

### 1. Test the Deployment

1. Visit your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Login as admin
3. Create a test rep
4. Create a test route
5. Login as rep and verify route appears

### 2. Configure Custom Domain (Optional)

1. In Vercel project settings → **Domains**
2. Add your domain
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

### 3. Update Supabase Auth Settings

1. Go to Supabase → **Authentication** → **URL Configuration**
2. Add your Vercel URL to **Site URL**
3. Add your Vercel URL to **Redirect URLs**:
   - `https://your-app.vercel.app/**`
   - `https://your-domain.com/**` (if using custom domain)

### 4. Add PWA Icons

Upload your app icons to `/public`:
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)
- `favicon.ico`

Generate icons at [realfavicongenerator.net](https://realfavicongenerator.net)

### 5. Update manifest.json

Edit `public/manifest.json` and update the `start_url` if needed.

## Environment Variables Reference

| Variable | Required | Location | Description |
|----------|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Client & Server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Client & Server | Supabase anon/public key |
| `GOOGLE_MAPS_API_KEY` | No | Server only | For route optimization |

## Troubleshooting

### Build Fails

**Check**: TypeScript errors
- Fix: Run `npm run build` locally first
- Review and fix any type errors

### Login Not Working

**Check**: Redirect URLs in Supabase
- Fix: Add your Vercel URL to allowed redirect URLs

### API Routes Failing

**Check**: Environment variables
- Fix: Verify all env vars are set in Vercel
- Redeploy after adding/changing env vars

### Route Optimization Not Working

**Check**: Google Maps API key
- Verify key is set (without `NEXT_PUBLIC_` prefix)
- Check key has Geocoding + Directions APIs enabled
- Fallback algorithm will run if API fails

## Monitoring

### Vercel Analytics

Enable in Vercel dashboard:
- Project Settings → Analytics
- Free tier includes basic metrics

### Supabase Logs

Monitor in Supabase dashboard:
- Logs → Auth (login attempts)
- Logs → Database (query performance)
- Logs → API (request errors)

### Error Tracking

Consider adding:
- Sentry for error tracking
- LogRocket for session replay
- PostHog for product analytics

## Scaling

### Database

Supabase free tier includes:
- 500 MB database space
- 50,000 monthly active users
- 2 GB bandwidth

Upgrade to Pro ($25/mo) for:
- 8 GB database space
- 100,000 monthly active users
- 250 GB bandwidth

### Google Maps API

Monitor usage in Google Cloud Console:
- Free: $200/month credit
- ~40,000 geocode requests/month free
- Cache geocodes in database to minimize costs

## Backup Strategy

### Database Backups

Supabase automatic backups:
- Free tier: 7 days retention
- Pro tier: 30 days retention

Manual backup:
- Database → Backups → Download

### Code Backups

- Git repository (already backed up)
- Vercel deployment history (automatic)

## Security Checklist

- [ ] Strong admin passwords
- [ ] Google Maps API key restricted properly
- [ ] Supabase RLS policies verified
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Environment variables secured
- [ ] No secrets in code repository
- [ ] Regular security updates (`npm audit`)

## Support

Having issues? Check:
1. Vercel deployment logs
2. Browser console errors
3. Supabase logs and metrics
4. This deployment guide
5. Main [README.md](README.md)

---

**Pro Tip**: Set up a staging environment by creating a separate Vercel project connected to a `develop` branch. This lets you test changes before deploying to production.
