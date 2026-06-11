# Supabase Setup Guide

This document outlines the recommended Supabase setup for the Tourist Guide application.

## Architecture Context

The app is now a Vite + React SPA, not a Next.js application.

- Use `VITE_*` for client-exposed environment variables
- Do not add Next.js route handlers, `next/server`, or App Router auth callbacks to this repo
- Treat this repo as the frontend only
- Put trusted operations such as payment webhooks, email sending, and secret-backed integrations in Supabase Edge Functions or another backend service

Recommended split:

- `tourist-guide-webapp` on Vercel for the static frontend
- Supabase for Postgres, auth, storage, and optional Edge Functions
- Payment provider webhooks handled outside the browser
- Email/WhatsApp delivery handled outside the browser

## Prerequisites

- A Supabase account (free tier works)
- Node.js 18+ installed

---

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in:
   - **Name**: `tourist-guide` (or your preferred name)
   - **Database Password**: Generate a strong password (save this!)
   - **Region**: Choose closest to your users
4. Wait for project to be created (~2 minutes)

---

## 2. Get API Keys

1. Go to **Project Settings** → **API**
2. Copy these values:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon/public key` → `VITE_SUPABASE_ANON_KEY`
   - `service_role key` → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

---

## 3. Environment Variables

Create a `.env.local` file in the project root:

```env
# Client-safe Supabase config for the Vite app
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Server-only secrets for Edge Functions or another backend
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
PAYMENT_PROVIDER_SECRET_KEY=your-secret-here
RESEND_API_KEY=your-resend-api-key
WHATSAPP_API_TOKEN=your-whatsapp-token

# Public app URL
VITE_APP_URL=http://localhost:5173
```

Do not expose service-role, payment, email, or WhatsApp secrets to the Vite app bundle.

---

## 4. Install Supabase Client

```bash
npm install @supabase/supabase-js
```

---

## 5. Database Schema

Run these SQL commands in the Supabase SQL Editor (**Database** → **SQL Editor**):

### Users Table (extends Supabase auth.users)

```sql
-- Create profiles table that extends auth.users
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Trips Table

```sql
CREATE TABLE public.trips (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  short_description TEXT NOT NULL,
  destination TEXT NOT NULL,
  country TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('local', 'international')),
  category TEXT NOT NULL CHECK (category IN ('group', 'custom')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  duration INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  max_participants INTEGER NOT NULL,
  current_bookings INTEGER DEFAULT 0,
  itinerary JSONB DEFAULT '[]',
  images JSONB DEFAULT '[]',
  cover_image JSONB NOT NULL,
  included TEXT[] DEFAULT '{}',
  excluded TEXT[] DEFAULT '{}',
  meeting_point JSONB,
  difficulty TEXT CHECK (difficulty IN ('easy', 'moderate', 'challenging')),
  highlights TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read trips
CREATE POLICY "Trips are viewable by everyone"
  ON public.trips FOR SELECT
  USING (true);

-- Create index for common queries
CREATE INDEX trips_type_idx ON public.trips(type);
CREATE INDEX trips_featured_idx ON public.trips(featured);
CREATE INDEX trips_start_date_idx ON public.trips(start_date);
```

### Bookings Table

```sql
CREATE TABLE public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reference TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  trip_id UUID REFERENCES public.trips(id) ON DELETE SET NULL,
  travelers JSONB NOT NULL DEFAULT '[]',
  number_of_travelers INTEGER NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
  booking_status TEXT DEFAULT 'pending' CHECK (booking_status IN ('pending', 'confirmed', 'cancelled', 'completed', 'refunded')),
  payment_reference TEXT,
  ticket_url TEXT,
  qr_code TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own bookings
CREATE POLICY "Users can view own bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can create bookings
CREATE POLICY "Users can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX bookings_user_id_idx ON public.bookings(user_id);
CREATE INDEX bookings_trip_id_idx ON public.bookings(trip_id);
CREATE INDEX bookings_reference_idx ON public.bookings(reference);
```

### Wishlist Table

```sql
CREATE TABLE public.wishlists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, trip_id)
);

-- Enable RLS
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

-- Policy: Users can manage their own wishlist
CREATE POLICY "Users can manage own wishlist"
  ON public.wishlists FOR ALL
  USING (auth.uid() = user_id);

CREATE INDEX wishlists_user_id_idx ON public.wishlists(user_id);
```

### Reviews Table

```sql
CREATE TABLE public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  photos JSONB DEFAULT '[]',
  verified BOOLEAN DEFAULT FALSE,
  helpful INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read reviews
CREATE POLICY "Reviews are viewable by everyone"
  ON public.reviews FOR SELECT
  USING (true);

-- Policy: Authenticated users can create reviews
CREATE POLICY "Users can create reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX reviews_trip_id_idx ON public.reviews(trip_id);
CREATE INDEX reviews_rating_idx ON public.reviews(rating);
```

### Custom Package Requests Table

```sql
CREATE TABLE public.custom_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  destination TEXT NOT NULL,
  preferred_start DATE,
  preferred_end DATE,
  flexibility TEXT CHECK (flexibility IN ('exact', 'flexible', 'very_flexible')),
  group_size INTEGER NOT NULL,
  budget TEXT,
  interests TEXT[] DEFAULT '{}',
  special_requests TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'itinerary_sent', 'deposit_paid', 'confirmed', 'cancelled')),
  itinerary_pdf_url TEXT,
  invoice_url TEXT,
  deposit_amount DECIMAL(10,2),
  total_amount DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.custom_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own requests
CREATE POLICY "Users can view own requests"
  ON public.custom_requests FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Policy: Anyone can create requests (guest checkout allowed)
CREATE POLICY "Anyone can create requests"
  ON public.custom_requests FOR INSERT
  WITH CHECK (true);

CREATE INDEX custom_requests_email_idx ON public.custom_requests(email);
CREATE INDEX custom_requests_status_idx ON public.custom_requests(status);
```

### Gallery Table

```sql
CREATE TABLE public.gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  alt TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  thumbnail TEXT,
  caption TEXT,
  trip_id UUID REFERENCES public.trips(id) ON DELETE SET NULL,
  trip_name TEXT,
  date DATE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view gallery
CREATE POLICY "Gallery is viewable by everyone"
  ON public.gallery FOR SELECT
  USING (true);

CREATE INDEX gallery_trip_id_idx ON public.gallery(trip_id);
CREATE INDEX gallery_featured_idx ON public.gallery(featured);
```

---

## 6. Supabase Client Setup

Create `src/lib/db/supabase.ts`:

```typescript
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

Recommended notes:

- Keep this in the frontend only for browser-safe operations
- Use row-level security for all user-scoped tables
- Keep any privileged writes in Edge Functions or another backend

If you prefer a small helper instead of a singleton:

```typescript
import { createClient } from "@supabase/supabase-js";

export function createSupabaseClient() {
  return createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
}
```

---

## 7. Authentication Setup

### Enable Auth Providers

1. Go to **Authentication** → **Providers**
2. Enable:
   - **Email** (enabled by default)
   - **Google** (optional - requires Google Cloud Console setup)

### Configure Email Templates

1. Go to **Authentication** → **Email Templates**
2. Customize templates for:
   - Confirm signup
   - Reset password
   - Magic link

### Auth Strategy For This Repo

Because this app is a Vite SPA, do not create a server callback route inside `src/app/**`.

Recommended options:

1. Use Supabase client auth directly in the browser for email OTP, magic link, or OAuth
2. Configure Supabase redirect URLs to point to frontend routes such as `/book`, `/wishlist`, or a dedicated `/auth/callback` page component
3. If you need secure session exchange or provider-specific server handling, do that in Supabase Edge Functions or another backend service

For the current roadmap, auth should be introduced at payment time rather than across the whole browsing experience.

---

## 8. Storage Buckets

1. Go to **Storage** → **New bucket**
2. Create buckets:
   - `trip-images` (public)
   - `gallery` (public)
   - `tickets` (private)
   - `avatars` (public)

### Storage Policies

```sql
-- Allow public read access to trip-images
CREATE POLICY "Public read access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'trip-images');

-- Allow authenticated users to upload avatars
CREATE POLICY "Users can upload avatars"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
```

---

## 9. Edge Functions (Recommended For Trusted Workflows)

Use Edge Functions or another backend for:

- Payment initialization if the provider secret must be hidden
- Payment webhooks
- Post-payment booking confirmation
- Transactional email sending
- WhatsApp itinerary or reminder delivery
- Admin-only updates

Supabase Edge Functions example flow:

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref your-project-id

# Create function
supabase functions new payment-webhook

# Deploy
supabase functions deploy payment-webhook
```

Suggested function boundaries:

- `create-payment-session`
- `payment-webhook`
- `send-booking-confirmation`
- `deliver-itinerary`

---

## 10. Testing Connection

Add this to any page to test:

```typescript
import { useEffect, useState } from "react";
import { supabase } from "@/lib/db/supabase";

export default function TestPage() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    supabase.from("trips").select("*").then(({ data }) => {
      setTrips(data || []);
    });
  }, []);

  return <pre>{JSON.stringify(trips, null, 2)}</pre>;
}
```

---

## Troubleshooting

### Common Issues

1. **"relation does not exist"** → Run the SQL schema commands
2. **"permission denied"** → Check RLS policies
3. **"Invalid API key"** → Verify `.env.local` values
4. **Auth not working** → Check redirect URLs in the Supabase dashboard and confirm they point to frontend routes, not Next.js handlers
5. **Webhook failures** → Verify your Edge Function or backend secret configuration instead of debugging in the browser

### Useful Commands

```sql
-- Check if tables exist
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';

-- Check RLS policies
SELECT * FROM pg_policies WHERE schemaname = 'public';

-- Disable RLS temporarily (for debugging)
ALTER TABLE public.trips DISABLE ROW LEVEL SECURITY;
```

---

## Next Steps

1. Add a real `src/lib/db/supabase.ts` client when data work starts
2. Move wishlist sync from placeholder logic to Supabase-backed persistence
3. Implement payment flow through Edge Functions or another trusted backend
4. Add transactional email and WhatsApp delivery outside the SPA
5. Introduce auth only at checkout or payment boundaries
