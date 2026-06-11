This file is going to be used for request features and updates...make sure to keep progress on it.

## Architecture Notes

- Frontend runtime is now `React + Vite` with `BrowserRouter`
- Vercel should be treated as static frontend hosting for this app
- Planned trusted workflows such as payments, auth-at-payment, notifications, and itinerary delivery should be implemented in Supabase and/or external backend functions, not directly in the SPA
- Supabase docs in this repo should use `VITE_*` env vars and frontend route callbacks rather than Next.js server handlers

## Request 1 - Custom Booking Flow [IN PROGRESS]
  - ✅ Created custom booking form page at `/book` with all required fields
  - ✅ Added budget range selector (4 ranges: $500-1K, $1K-2K, $2K-5K, $5K+)
  - ✅ Added contact preference selector (Email/WhatsApp)
  - ✅ For customised trips, removed "What's Included" and "What's not" sections
  - ✅ Updated FAQ "Customise my itenary" question to link to `/book?custom=true`
  - ⏳ **PENDING**: Payment integration for $50 deposit (Stripe/Paystack)
  - ⏳ **PENDING**: Email/WhatsApp notification system after payment confirmation
  - ⏳ **PENDING**: Itinerary delivery system via email/WhatsApp

  **Note**: Form flow is complete. Payment integration on hold - will continue later.

## Request 2 - Payment Deadline [PARTIAL]
  - ⏳ For the book a trip section(that we will be creating), let's Add payment deadline
  - ✅ Added urgency badges showing "Xd left" on trip cards
  - ✅ Added booking deadline display in trip detail booking card

## Request 3 - Hide Day-by-Day Itinerary for Normal Trips [COMPLETE]
  - ✅ Day-by-day itinerary now only shows for `trip.category === "custom"`

## Request 4 - Join Available Packages [COMPLETE]
  - ✅ Departure cards show "Reserve My Spot" button
  - ✅ Spots remaining badges visible when almost full
  - ✅ Users can select number of travelers before booking

## Request 5 - Brands Section [COMPLETE]
  - ✅ "Trusted By" section on homepage with brands:
    - Pepsodent
    - Swiss Embassy
    - AEJ Travel and Tours
    - Escape Accra

## Request 6 - Deadline Passed Messaging [COMPLETE]
  - ✅ Trip detail page shows "New dates coming soon" when deadline passed
  - ✅ Includes WhatsApp notification signup option

## Request 7 - Auth Only for Payments [PENDING]
  - ⏳ Users only sign-in when they are making payments
  - **Note**: Will implement with payment integration
