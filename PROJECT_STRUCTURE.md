# Project Structure

Complete file tree and architecture overview.

## Directory Structure

```
door-to-door-app/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with PWA config
│   ├── globals.css              # Global styles and Tailwind
│   ├── page.tsx                 # Home redirect logic
│   │
│   ├── login/                   # Authentication
│   │   └── page.tsx            # Login form
│   │
│   ├── rep/                     # Rep-facing pages
│   │   ├── today/
│   │   │   └── page.tsx        # Today's route dashboard
│   │   └── stop/[id]/
│   │       └── page.tsx        # Stop detail page
│   │
│   ├── admin/                   # Admin-facing pages
│   │   ├── page.tsx            # Admin dashboard
│   │   ├── reps/
│   │   │   └── page.tsx        # Rep management
│   │   └── routes/
│   │       ├── page.tsx        # Routes list
│   │       ├── new/
│   │       │   └── page.tsx    # Create route
│   │       └── [id]/
│   │           └── page.tsx    # Route detail
│   │
│   └── api/                     # API Routes
│       └── admin/
│           ├── create-rep/
│           │   └── route.ts    # Create rep endpoint
│           ├── create-route/
│           │   └── route.ts    # Create route endpoint
│           ├── import-stops/
│           │   └── route.ts    # CSV import endpoint
│           ├── delete-stop/
│           │   └── route.ts    # Delete stop endpoint
│           └── optimize-route/
│               └── route.ts    # Route optimization endpoint
│
├── components/                  # React Components
│   ├── LogoutButton.tsx        # Logout functionality
│   ├── StopDetailClient.tsx    # Stop detail client component
│   ├── CreateRepForm.tsx       # Create rep form
│   ├── CreateRouteForm.tsx     # Create route form
│   └── RouteDetailClient.tsx   # Route detail client component
│
├── lib/                         # Utilities
│   └── supabase/
│       ├── client.ts           # Browser Supabase client
│       ├── server.ts           # Server Supabase client
│       └── middleware.ts       # Supabase middleware utilities
│
├── types/                       # TypeScript Types
│   ├── database.ts             # Supabase database types
│   └── index.ts                # App-specific types
│
├── supabase/                    # Supabase Configuration
│   └── migrations/
│       └── 001_initial_schema.sql  # Database schema + RLS
│
├── public/                      # Static Assets
│   ├── manifest.json           # PWA manifest
│   ├── robots.txt              # SEO robots file
│   └── ICONS_README.txt        # Instructions for icons
│
├── middleware.ts                # Next.js middleware (auth)
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind CSS config
├── postcss.config.mjs          # PostCSS config
├── next.config.ts              # Next.js config
│
├── .env.example                # Environment template
├── .env.local                  # Your local env (create this)
├── .gitignore                  # Git ignore rules
├── .npmrc                      # npm configuration
├── .nvmrc                      # Node version
│
├── README.md                   # Complete documentation
├── QUICKSTART.md               # 10-minute setup guide
├── DEPLOYMENT.md               # Production deployment guide
└── PROJECT_STRUCTURE.md        # This file
```

## Key Files Explained

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `tsconfig.json` | TypeScript compiler settings |
| `tailwind.config.ts` | Tailwind CSS customization |
| `next.config.ts` | Next.js configuration |
| `.env.example` | Environment variables template |

### Core Application

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout, PWA metadata |
| `middleware.ts` | Authentication middleware |
| `app/page.tsx` | Home page with role-based redirect |

### Authentication & Auth Flow

1. User visits any protected route
2. `middleware.ts` checks auth status
3. Redirects to `/login` if not authenticated
4. After login, redirects based on role:
   - Admin → `/admin`
   - Rep → `/rep/today`

### Rep Experience

| Route | Component | Purpose |
|-------|-----------|---------|
| `/rep/today` | `app/rep/today/page.tsx` | View today's routes and stops |
| `/rep/stop/[id]` | `app/rep/stop/[id]/page.tsx` | Stop detail with contact form |

### Admin Experience

| Route | Component | Purpose |
|-------|-----------|---------|
| `/admin` | `app/admin/page.tsx` | Dashboard with stats |
| `/admin/reps` | `app/admin/reps/page.tsx` | Manage rep accounts |
| `/admin/routes` | `app/admin/routes/page.tsx` | View all routes |
| `/admin/routes/new` | `app/admin/routes/new/page.tsx` | Create new route |
| `/admin/routes/[id]` | `app/admin/routes/[id]/page.tsx` | Route detail & management |

### API Endpoints

All admin API routes require authentication and admin role.

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/admin/create-rep` | POST | Create new rep user |
| `/api/admin/create-route` | POST | Create route with stops |
| `/api/admin/import-stops` | POST | Import stops from CSV |
| `/api/admin/delete-stop` | POST | Delete a stop |
| `/api/admin/optimize-route` | POST | Optimize stop order |

## Data Flow

### Creating a Route (Admin)

1. Admin fills form in `/admin/routes/new`
2. Form submits to `/api/admin/create-route`
3. API creates route and stops in Supabase
4. Redirects to route detail page
5. RLS ensures rep can now see this route

### Completing a Stop (Rep)

1. Rep opens stop detail page
2. Fills in phone, email, notes
3. Clicks "Mark Finished"
4. Client updates stop via Supabase client
5. RLS allows update (rep owns this route)
6. Redirects back to today's dashboard
7. Admin sees updated status in real-time

### Route Optimization

1. Admin clicks "Optimize Route" button
2. Client calls `/api/admin/optimize-route`
3. Server checks for geocoded coordinates
4. Geocodes missing addresses via Google Maps API
5. Tries Google Directions API optimization
6. Falls back to nearest-neighbor if API unavailable
7. Updates stop sort_order in database
8. Returns success message with method used

## Database Schema

### Tables

**profiles**
- Links to Supabase auth.users
- Stores role (admin/rep) and name

**routes**
- Assigned to a rep for a specific date
- Created by admin
- Tracks optimization timestamp

**stops**
- Belongs to a route
- Has address, contact info, notes
- Status: pending/finished/skipped
- Cached geocoding (lat/lng)
- Sort order for optimization

### Row Level Security (RLS)

- Admins: Full access to all tables
- Reps: Can only read/write their own routes and stops
- Public: No access

## Tech Stack Details

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **React 19**: Latest React features

### Backend
- **Next.js API Routes**: Server-side logic
- **Supabase**: PostgreSQL database + auth
- **Google Maps API**: Geocoding + route optimization

### Deployment
- **Vercel**: Frontend hosting (edge network)
- **Supabase**: Backend hosting (managed Postgres)

### PWA Features
- Manifest file for installability
- Mobile-first responsive design
- Optimized for touch interfaces
- Works offline (basic functionality)

## Security Layers

1. **Supabase Auth**: Email/password authentication
2. **RLS Policies**: Database-level access control
3. **Middleware**: Route protection
4. **API Route Checks**: Server-side role verification
5. **Environment Variables**: Secrets never in code

## Performance Optimizations

- Server Components for fast initial load
- Client Components only where needed
- Minimal JavaScript bundle
- Tailwind CSS purging unused styles
- Geocoding cache to reduce API calls
- Efficient database indexes

## Extensibility

Easy to add:
- Photo uploads (Supabase Storage)
- Push notifications (web push)
- Real-time updates (Supabase Realtime)
- Additional user roles
- Custom fields on stops
- Report generation
- Mobile native apps (React Native)

## Development vs Production

| Aspect | Development | Production |
|--------|-------------|------------|
| URL | localhost:3000 | your-app.vercel.app |
| Database | Supabase project | Same (or separate) |
| HTTPS | No | Yes (automatic) |
| Hot Reload | Yes | No |
| Error Details | Verbose | Minimal |
| Source Maps | Yes | No |

## Maintenance

### Regular Tasks
- Monitor Supabase usage
- Check Google Maps API costs
- Review error logs
- Update dependencies monthly
- Test on new devices/browsers

### Backups
- Supabase: Automatic (7-30 days)
- Code: Git repository
- Vercel: Deployment history

---

**Questions?** See [README.md](README.md) for detailed documentation.
