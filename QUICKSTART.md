# Quick Start Guide

Get your Door-to-Door Route Manager running in 10 minutes.

## Step 1: Install Dependencies (2 min)

```bash
cd door-to-door-app
npm install
```

## Step 2: Create Supabase Project (3 min)

1. Go to [supabase.com](https://supabase.com) → New Project
2. Wait for provisioning
3. Copy your credentials:
   - Settings → API → Project URL
   - Settings → API → anon public key

## Step 3: Configure Environment (1 min)

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials.

## Step 4: Run Database Migration (2 min)

1. Open Supabase dashboard → SQL Editor
2. Copy contents of `supabase/migrations/001_initial_schema.sql`
3. Paste and run

## Step 5: Create Admin User (2 min)

In Supabase dashboard:

1. **Authentication** → **Users** → **Add User**
   - Email: your@email.com
   - Password: (choose a strong password)
   - Click **Create User**
   - **Copy the User ID**

2. **Table Editor** → **profiles** → **Insert row**
   - id: (paste the User ID)
   - role: admin
   - full_name: Your Name
   - Click **Save**

## Step 6: Start the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and login!

## Next Steps

- Create rep users via Admin → Manage Reps
- Create your first route via Admin → Create Route
- (Optional) Add Google Maps API key for route optimization

## Need Help?

See [README.md](README.md) for detailed documentation.
