import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with Tailwind merge support
 * Handles conditional classes and deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price with currency symbol
 */
export function formatPrice(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date for display
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", options).format(dateObj);
}

/**
 * Format date range (e.g., "Mar 15 - 22, 2024")
 */
export function formatDateRange(start: Date | string, end: Date | string): string {
  const startDate = typeof start === "string" ? new Date(start) : start;
  const endDate = typeof end === "string" ? new Date(end) : end;

  const sameMonth = startDate.getMonth() === endDate.getMonth();
  const sameYear = startDate.getFullYear() === endDate.getFullYear();

  if (sameMonth && sameYear) {
    return `${formatDate(startDate, { month: "short", day: "numeric" })} - ${formatDate(endDate, { day: "numeric" })}, ${endDate.getFullYear()}`;
  }

  if (sameYear) {
    return `${formatDate(startDate, { month: "short", day: "numeric" })} - ${formatDate(endDate, { month: "short", day: "numeric" })}, ${endDate.getFullYear()}`;
  }

  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

/**
 * Calculate days until a date
 */
export function daysUntil(date: Date | string): number {
  const targetDate = typeof date === "string" ? new Date(date) : date;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Generate a slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Calculate spots remaining for a trip
 */
export function getSpotsRemaining(maxParticipants: number, currentBookings: number): number {
  return Math.max(0, maxParticipants - currentBookings);
}

/**
 * Check if a trip is almost full (less than 20% spots remaining)
 */
export function isAlmostFull(maxParticipants: number, currentBookings: number): boolean {
  const remaining = getSpotsRemaining(maxParticipants, currentBookings);
  return remaining > 0 && remaining <= maxParticipants * 0.2;
}

/**
 * Check if a trip is sold out
 */
export function isSoldOut(maxParticipants: number, currentBookings: number): boolean {
  return getSpotsRemaining(maxParticipants, currentBookings) === 0;
}

/**
 * Generate a random booking reference
 */
export function generateBookingReference(): string {
  const prefix = "WL";
  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${year}-${random}`;
}
