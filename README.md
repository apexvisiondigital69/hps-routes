# Door-to-Door Route Manager

A production-ready route management application for door-to-door sales teams. Built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

### For Sales Reps
- View today's assigned routes and stops
- Mark stops as Finished or Skipped
- Add contact information (phone, email) and notes
- Open Google Maps walking directions to each stop
- Track progress with visual status indicators
- Mobile-first responsive design
- Installable as PWA

### For Admins
- Create and manage rep accounts
- Create routes and assign to reps
- Bulk paste addresses
- Import/Export routes as CSV
- Optimize route order with Google Maps API or fallback algorithm
- View real-time progress and completion stats
- Read notes and contact information from completed stops

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel (frontend), Supabase (backend)
- **PWA**: Installable on mobile devices

## Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works)
- (Optional) Google Maps API key for route optimization

## Local Development Setup

### 1. Clone and Install

```bash
cd door-to-door-app
npm install
```

### 2. Set Up Supabase

1. Go to [https://supabase.com](https://supabase.com) and create a new project
2. Wait for the database to be provisioned (2-3 minutes)
3. Go to **Project Settings** → **API** and copy:
   - Project URL
   - `anon` `public` key

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional: Google Maps API key for route optimization
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

### 4. Run Database Migrations

In the Supabase dashboard:

1. Go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Click **Run**

This will create:
- Tables: `profiles`, `routes`, `stops`
- Row Level Security (RLS) policies
- Indexes
- Triggers

### 5. Create First Admin User

**IMPORTANT**: You need to use the Supabase Service Role key (NOT the anon key) to create the first admin user.

#### Option A: Using Supabase Dashboard (Easiest)

1. Go to **Authentication** → **Users** in Supabase dashboard
2. Click **Add User** → **Create new user**
3. Enter email and password
4. Click **Create User**
5. Copy the User ID (UUID)
6. Go to **Table Editor** → **profiles**
7. Click **Insert** → **Insert row**
8. Fill in:
   - `id`: Paste the User ID you copied
   - `role`: `admin`
   - `full_name`: Your name (optional)
9. Click **Save**

#### Option B: Using SQL

1. Go to **SQL Editor** in Supabase dashboard
2. Run this query (replace email and password):

```sql
-- Create auth user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@example.com',  -- CHANGE THIS
  crypt('your-password', gen_salt('bf')),  -- CHANGE THIS
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
)
RETURNING id;

-- Create profile (use the ID returned from above)
INSERT INTO public.profiles (id, role, full_name)
VALUES (
  'PASTE-USER-ID-HERE',  -- Paste the ID from the query above
  'admin',
  'Admin User'
);
```

### 6. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and login with your admin credentials.

## Google Maps API Setup (Optional but Recommended)

The route optimization feature works best with Google Maps API. Without it, the app uses a simple nearest-neighbor fallback algorithm.

### Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable these APIs:
   - **Geocoding API** (for address → lat/lng conversion)
   - **Directions API** (for route optimization)
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Copy the API key
6. **IMPORTANT**: Restrict the API key:
   - Application restrictions: None (server-side use only)
   - API restrictions: Only enable Geocoding API and Directions API

### Add to Environment

Add to your `.env.local`:

```env
GOOGLE_MAPS_API_KEY=your-api-key-here
```

**Security Note**: This key is server-side only and never exposed to the client. It's used in API routes (`/api/admin/optimize-route`).

## Usage Guide

### Admin Workflow

1. **Create Reps**: Go to Admin → Manage Reps → Create New Rep
2. **Create Route**:
   - Go to Admin → Create Route
   - Select rep and date
   - Paste addresses (one per line)
   - Click Create Route
3. **Optimize Route**: On route detail page, click "Optimize Route"
4. **Monitor Progress**: View completion stats on Admin Dashboard

### Rep Workflow

1. **Login**: Use credentials provided by admin
2. **View Today's Routes**: See list of assigned stops
3. **Navigate**: Click "Next Stop" or open Google Maps
4. **Complete Stop**:
   - Click on stop
   - Add phone, email, notes
   - Mark as Finished or Skipped
5. **Continue**: Return to route list and move to next stop

### CSV Import/Export

**Export Format**:
```csv
address,phone,email,notes,status,sort_order
"123 Main St, City, ST 12345","555-1234","john@email.com","Nice customer",finished,0
```

**Import Requirements**:
- `address` is required
- Other fields are optional
- Status must be: pending, finished, or skipped
- If sort_order is missing, stops are appended in file order

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Click **Import Project**
4. Select your repository
5. Configure:
   - Framework: Next.js
   - Root Directory: `door-to-door-app` (if not at repo root)
   - Environment Variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `GOOGLE_MAPS_API_KEY` (optional)
6. Click **Deploy**

### PWA Installation

On mobile browsers:
- **iOS Safari**: Tap Share → Add to Home Screen
- **Android Chrome**: Tap Menu → Install App

## Project Structure

```
door-to-door-app/
├── app/
│   ├── login/              # Login page
│   ├── rep/                # Rep pages
│   │   ├── today/          # Today's routes dashboard
│   │   └── stop/[id]/      # Stop detail page
│   ├── admin/              # Admin pages
│   │   ├── page.tsx        # Admin dashboard
│   │   ├── reps/           # Rep management
│   │   └── routes/         # Route management
│   └── api/                # API routes
│       └── admin/          # Admin API endpoints
├── components/             # React components
├── lib/
│   └── supabase/          # Supabase client utilities
├── types/                 # TypeScript type definitions
├── supabase/
│   └── migrations/        # Database migrations
└── public/                # Static assets
```

## Database Schema

### profiles
- `id` (uuid, pk) - References auth.users
- `role` (text) - 'admin' or 'rep'
- `full_name` (text, nullable)
- `created_at` (timestamp)

### routes
- `id` (uuid, pk)
- `rep_id` (uuid) - FK to profiles
- `route_date` (date)
- `title` (text, nullable)
- `created_by` (uuid) - FK to profiles
- `created_at` (timestamp)
- `last_optimized_at` (timestamp, nullable)

### stops
- `id` (uuid, pk)
- `route_id` (uuid) - FK to routes
- `sort_order` (int)
- `address` (text, required)
- `phone` (text, nullable)
- `email` (text, nullable)
- `notes` (text, nullable)
- `status` (text) - 'pending', 'finished', or 'skipped'
- `completed_at` (timestamp, nullable)
- `updated_at` (timestamp)
- `lat`, `lng` (double, nullable) - Cached geocoding
- `geocode_provider` (text, nullable)
- `geocoded_at` (timestamp, nullable)

## Row Level Security (RLS)

All tables have RLS enabled:

- **Admins**: Full read/write access to all data
- **Reps**: Can only read/write their own routes and stops
- **Anonymous**: No access

## API Endpoints

All admin endpoints require authentication and admin role:

- `POST /api/admin/create-rep` - Create new rep user
- `POST /api/admin/create-route` - Create new route with stops
- `POST /api/admin/import-stops` - Import stops from CSV
- `POST /api/admin/delete-stop` - Delete a stop
- `POST /api/admin/optimize-route` - Optimize route order

## Troubleshooting

### "User not authorized" errors
- Check RLS policies are applied
- Verify user has correct role in profiles table
- Ensure user is logged in

### Route optimization not working
- Check if Google Maps API key is set
- Verify APIs are enabled in Google Cloud Console
- Check API key restrictions
- Fallback algorithm will run if API fails

### PWA not installing
- Must be served over HTTPS (works on Vercel by default)
- Check manifest.json is accessible at /manifest.json
- Add app icons (see public/ICONS_README.txt)

### Supabase connection issues
- Verify environment variables are set correctly
- Check Supabase project is not paused (free tier pauses after 7 days inactivity)
- Ensure database migrations ran successfully

## Development Notes

### Creating Additional Admin Users

After deploying, you can create more admins through the existing admin panel:
1. Create them as reps first
2. Go to Supabase dashboard → Table Editor → profiles
3. Change their `role` from 'rep' to 'admin'

### Resetting Rep Passwords

Use Supabase Auth dashboard:
1. Go to Authentication → Users
2. Find the user
3. Click "..." → Send password recovery email

### Database Backups

Supabase automatically backs up your database. To manually export:
1. Go to Database → Backups
2. Click "Download backup"

## Cost Estimates

- **Supabase Free Tier**: Up to 50,000 monthly active users
- **Vercel Free Tier**: Unlimited bandwidth for personal projects
- **Google Maps API**:
  - Geocoding: $5 per 1,000 requests (first 40,000/month free with $200 credit)
  - Directions: $5 per 1,000 requests
  - With caching, ~$0-10/month for small teams

## License

MIT License - feel free to use for your business.

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review Supabase logs in the dashboard
3. Check browser console for errors

## Security Checklist

Before going to production:
- [ ] Change all default passwords
- [ ] Set strong passwords for admin users
- [ ] Restrict Google Maps API key properly
- [ ] Enable MFA in Supabase for admin accounts
- [ ] Review RLS policies
- [ ] Set up database backups
- [ ] Configure custom domain with HTTPS
- [ ] Update robots.txt with your domain
- [ ] Add custom app icons for PWA

## Future Enhancements

Potential features for future versions:
- Offline support with service workers
- Photo upload at each stop
- GPS proximity verification
- Multi-day route planning
- Route templates
- Automatic assignment based on rep location
- Performance analytics and reporting
- SMS/Email notifications
- Real-time rep tracking (for admin)
- Commission calculations

---

Built with ❤️ for sales teams who hustle.
