# Verification Checklist

Use this checklist to verify your installation is working correctly.

## Initial Setup ✓

- [ ] `npm install` completed without errors
- [ ] `.env.local` created with Supabase credentials
- [ ] Database migration ran successfully
- [ ] At least one admin user created
- [ ] Dev server starts with `npm run dev`
- [ ] Can access [http://localhost:3000](http://localhost:3000)

## Authentication ✓

- [ ] Can login as admin
- [ ] Can logout
- [ ] Invalid credentials show error message
- [ ] After login, redirects to `/admin` for admin
- [ ] Protected routes redirect to login when not authenticated

## Admin Functions ✓

### Rep Management
- [ ] Can access Admin → Manage Reps
- [ ] Can create a new rep user
- [ ] Rep appears in reps list
- [ ] Rep receives valid credentials

### Route Creation
- [ ] Can access Admin → Create Route
- [ ] Can select a rep from dropdown
- [ ] Can paste multiple addresses (one per line)
- [ ] Route is created successfully
- [ ] Redirects to route detail page

### Route Management
- [ ] Can view all routes at `/admin/routes`
- [ ] Can see route completion stats
- [ ] Can open route detail page
- [ ] Can see all stops in a route
- [ ] Can delete a stop

### CSV Import/Export
- [ ] Can export route as CSV
- [ ] CSV contains all stop data
- [ ] Can import stops from CSV
- [ ] Imported stops appear in route

### Route Optimization
- [ ] "Optimize Route" button visible
- [ ] Clicking button triggers optimization
- [ ] Success message appears
- [ ] Stop order changes (check sort_order)
- [ ] Works even without Google Maps API (fallback)

### Progress Monitoring
- [ ] Admin dashboard shows today's routes
- [ ] Completion counts visible
- [ ] Can see finished/skipped/pending counts
- [ ] Updates reflect when rep changes stop status

## Rep Functions ✓

### Login & Dashboard
- [ ] Can login as rep
- [ ] Redirects to `/rep/today`
- [ ] Can see today's assigned routes
- [ ] Progress counter shows correct numbers
- [ ] Stops list shows all addresses

### Stop Management
- [ ] Can click on a stop
- [ ] Stop detail page loads
- [ ] Address displays correctly
- [ ] "Open Walking Route" link works
- [ ] Google Maps opens (in browser or app)

### Data Entry
- [ ] Can enter phone number
- [ ] Can enter email address
- [ ] Can enter notes (multi-line)
- [ ] Data persists when clicking Save

### Status Updates
- [ ] Can mark stop as Finished
- [ ] Can mark stop as Skipped
- [ ] Status updates immediately
- [ ] Returns to dashboard after marking
- [ ] Color indicator updates (grey/green/orange)
- [ ] Progress counter updates
- [ ] Admin can see updated status

## Google Maps Integration ✓

### Without API Key
- [ ] Walking direction links work
- [ ] Route optimization uses fallback algorithm
- [ ] No errors in console

### With API Key (if configured)
- [ ] Route optimization uses Google API
- [ ] Success message indicates "Google Maps"
- [ ] Addresses are geocoded (lat/lng saved)
- [ ] Optimized order is intelligent

## Security ✓

### Row Level Security
- [ ] Rep cannot see other reps' routes
- [ ] Rep cannot access admin pages
- [ ] Rep cannot create routes
- [ ] Rep can only update their own stops

### API Security
- [ ] Admin API endpoints require admin role
- [ ] Rep cannot call admin endpoints
- [ ] Unauthenticated requests are rejected

## UI/UX ✓

### Mobile Responsiveness
- [ ] Works on phone screen (320px+)
- [ ] Buttons are easily tappable
- [ ] Text is readable without zooming
- [ ] Forms work on mobile keyboard
- [ ] No horizontal scrolling

### Visual Feedback
- [ ] Loading states show when saving
- [ ] Error messages display clearly
- [ ] Success messages display clearly
- [ ] Status colors are visible
- [ ] Disabled buttons look disabled

## PWA Features ✓

- [ ] manifest.json is accessible at `/manifest.json`
- [ ] Can "Add to Home Screen" on mobile
- [ ] Installed app opens in standalone mode
- [ ] App icon shows (if custom icons added)

## Performance ✓

- [ ] Pages load quickly
- [ ] No console errors
- [ ] No console warnings (except dev warnings)
- [ ] Database queries are fast
- [ ] No memory leaks during navigation

## Data Integrity ✓

- [ ] Stop status persists after browser refresh
- [ ] Notes and contact info save correctly
- [ ] Multiple reps don't interfere with each other
- [ ] Route optimization doesn't lose data
- [ ] CSV import preserves data format

## Edge Cases ✓

- [ ] Empty routes display correctly
- [ ] No routes for today shows appropriate message
- [ ] Long addresses display properly
- [ ] Special characters in notes work
- [ ] Multiple routes same day work

## Pre-Production ✓

- [ ] All TODOs in code removed
- [ ] Console.logs removed or kept minimal
- [ ] Environment variables documented
- [ ] Database backups configured
- [ ] Error monitoring setup (optional)

## Production Deployment ✓

- [ ] Deployed to Vercel
- [ ] Environment variables set in Vercel
- [ ] HTTPS enabled (automatic)
- [ ] Custom domain configured (optional)
- [ ] Supabase redirect URLs updated
- [ ] PWA icons uploaded
- [ ] robots.txt updated with domain

## Post-Deployment ✓

- [ ] Production login works
- [ ] Can create routes in production
- [ ] Rep can access routes on mobile
- [ ] Google Maps links work on mobile
- [ ] CSV import/export works
- [ ] No errors in production console

## Monitoring ✓

- [ ] Vercel Analytics enabled (optional)
- [ ] Supabase logs checked
- [ ] Error tracking configured (optional)
- [ ] Usage alerts set up (optional)

---

## Common Issues & Fixes

### "Cannot find module" errors
**Fix**: Run `npm install`

### "User not authorized" when logged in
**Fix**: Check profile exists in `profiles` table with correct role

### Route optimization fails
**Fix**: Check Google Maps API key is set (or fallback will run)

### Rep sees no routes
**Fix**: Ensure route_date matches today and rep_id is correct

### CSV import fails
**Fix**: Ensure CSV has `address` column (required)

### Login redirects to wrong page
**Fix**: Check `role` in profiles table is correct ('admin' or 'rep')

---

## Testing Scenarios

### Test Scenario 1: Full Admin Workflow
1. Login as admin
2. Create rep "John Doe"
3. Create route for John, tomorrow's date
4. Add 5 addresses
5. Optimize route
6. Export as CSV
7. Verify CSV contains all data

### Test Scenario 2: Full Rep Workflow
1. Login as rep
2. View today's route
3. Open first stop
4. Add phone, email, notes
5. Mark as Finished
6. Verify returns to dashboard
7. Verify stop shows green
8. Open next stop
9. Mark as Skipped
10. Verify stop shows orange

### Test Scenario 3: Multi-Rep Scenario
1. Create two reps (Rep A, Rep B)
2. Create route for Rep A with 3 stops
3. Create route for Rep B with 3 stops
4. Login as Rep A - should only see Rep A's stops
5. Login as Rep B - should only see Rep B's stops
6. Login as Admin - should see both routes

---

## Performance Benchmarks

Expected performance:
- **Initial page load**: < 1s
- **Route list load**: < 500ms
- **Stop save**: < 200ms
- **CSV export**: < 1s for 100 stops
- **Route optimization**: < 5s for 25 stops

---

**All checked?** You're ready to go! 🚀

See [README.md](README.md) for ongoing usage and [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment.
