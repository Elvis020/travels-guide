// ═══════════════════════════════════════════════════════════════════════════
// TOURIST GUIDE - Type Definitions
// ═══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// Trip Types
// ─────────────────────────────────────────────────────────────────────────────

export type TripType = "local" | "international";
export type TripCategory = "group" | "custom";
export type DifficultyLevel = "easy" | "moderate" | "challenging";

export interface Location {
  name: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  mapUrl?: string;
}

export interface MediaItem {
  id: string;
  url: string;
  alt: string;
  type: "image" | "video";
  thumbnail?: string;
  caption?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals?: ("breakfast" | "lunch" | "dinner")[];
  accommodation?: string;
}

export interface Trip {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  shortDescription: string;
  destination: string;
  country: string;
  type: TripType;
  category: TripCategory;
  dates: {
    start: string; // ISO date string
    end: string;
  };
  duration: number; // in days
  price: number;
  originalPrice?: number; // for showing discounts
  currency: string;
  maxParticipants: number;
  currentBookings: number;
  itinerary: ItineraryDay[];
  images: MediaItem[];
  coverImage: MediaItem;
  included: string[];
  excluded: string[];
  meetingPoint: Location;
  difficulty: DifficultyLevel;
  highlights: string[];
  tags: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Custom Package Types
// ─────────────────────────────────────────────────────────────────────────────

export type CustomPackageStatus =
  | "pending"
  | "itinerary_sent"
  | "deposit_paid"
  | "confirmed"
  | "cancelled";

export interface CustomPackageRequest {
  id: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  preferredDates: {
    start: string;
    end: string;
  };
  flexibility: "exact" | "flexible" | "very_flexible";
  groupSize: number;
  budget?: string;
  interests: string[];
  specialRequests?: string;
  status: CustomPackageStatus;
  itineraryPdfUrl?: string;
  invoiceUrl?: string;
  depositAmount?: number;
  totalAmount?: number;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Booking Types
// ─────────────────────────────────────────────────────────────────────────────

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "refunded";

export type PaymentStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "refunded";

export interface Traveler {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  specialRequirements?: string;
}

export interface Booking {
  id: string;
  reference: string; // e.g., "WL-24-ABC123"
  userId: string;
  tripId: string;
  trip?: Trip; // Populated trip details
  travelers: Traveler[];
  numberOfTravelers: number;
  totalAmount: number;
  currency: string;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  paymentReference?: string;
  ticketUrl?: string;
  qrCode?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// User Types
// ─────────────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
  wishlist: string[]; // Array of trip IDs
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Review Types
// ─────────────────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  tripId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1-5
  title: string;
  content: string;
  photos?: MediaItem[];
  verified: boolean; // Completed the trip
  helpful: number; // Helpful votes count
  createdAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Gallery Types
// ─────────────────────────────────────────────────────────────────────────────

export type GalleryFilter = "all" | "previous" | "upcoming";

export interface GalleryItem extends MediaItem {
  tripId?: string;
  tripName?: string;
  date?: string;
  featured?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// UI Component Types
// ─────────────────────────────────────────────────────────────────────────────

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// ─────────────────────────────────────────────────────────────────────────────
// API Response Types
// ─────────────────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Payment Types (Abstract for adapter pattern)
// ─────────────────────────────────────────────────────────────────────────────

export interface PaymentSession {
  id: string;
  url: string; // Redirect URL for payment
  expiresAt: string;
}

export interface PaymentResult {
  success: boolean;
  reference: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  metadata?: Record<string, unknown>;
}
