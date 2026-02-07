import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ═══════════════════════════════════════════════════════════════════════════
// Wishlist Store
// Uses localStorage for guests, syncs to server on login
// ═══════════════════════════════════════════════════════════════════════════

interface WishlistState {
  items: string[]; // Array of trip IDs
  isLoading: boolean;
  isSynced: boolean;

  // Actions
  add: (tripId: string) => void;
  remove: (tripId: string) => void;
  toggle: (tripId: string) => void;
  has: (tripId: string) => boolean;
  clear: () => void;
  getCount: () => number;

  // Server sync (called after login)
  syncWithServer: (userId: string) => Promise<void>;
  loadFromServer: (userId: string) => Promise<void>;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      isSynced: false,

      add: (tripId: string) => {
        const { items } = get();
        if (!items.includes(tripId)) {
          set({ items: [...items, tripId], isSynced: false });
        }
      },

      remove: (tripId: string) => {
        const { items } = get();
        set({
          items: items.filter((id) => id !== tripId),
          isSynced: false,
        });
      },

      toggle: (tripId: string) => {
        const { items, add, remove } = get();
        if (items.includes(tripId)) {
          remove(tripId);
        } else {
          add(tripId);
        }
      },

      has: (tripId: string) => {
        return get().items.includes(tripId);
      },

      clear: () => {
        set({ items: [], isSynced: false });
      },

      getCount: () => {
        return get().items.length;
      },

      // Sync local wishlist to server after login
      syncWithServer: async (userId: string) => {
        const { items } = get();
        set({ isLoading: true });

        try {
          // TODO: Implement Supabase sync
          // 1. Fetch existing server wishlist
          // 2. Merge with local items (union)
          // 3. Update server with merged list
          // 4. Update local state with server response

          /*
          const supabase = createClient();

          // Get existing server wishlist
          const { data: serverItems } = await supabase
            .from('wishlists')
            .select('trip_id')
            .eq('user_id', userId);

          const serverTripIds = serverItems?.map(item => item.trip_id) || [];

          // Merge local and server (union, no duplicates)
          const merged = [...new Set([...items, ...serverTripIds])];

          // Find new items to add to server
          const newItems = merged.filter(id => !serverTripIds.includes(id));

          if (newItems.length > 0) {
            await supabase.from('wishlists').insert(
              newItems.map(tripId => ({ user_id: userId, trip_id: tripId }))
            );
          }

          set({ items: merged, isSynced: true });
          */

          // Temporary: just mark as synced
          set({ isSynced: true });
        } catch (error) {
          console.error("Failed to sync wishlist:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      // Load wishlist from server (for returning users)
      loadFromServer: async (userId: string) => {
        set({ isLoading: true });

        try {
          // TODO: Implement Supabase fetch
          /*
          const supabase = createClient();

          const { data } = await supabase
            .from('wishlists')
            .select('trip_id')
            .eq('user_id', userId);

          if (data) {
            set({ items: data.map(item => item.trip_id), isSynced: true });
          }
          */

          set({ isSynced: true });
        } catch (error) {
          console.error("Failed to load wishlist:", error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "wanderlust-wishlist", // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }), // Only persist items
    }
  )
);

// ═══════════════════════════════════════════════════════════════════════════
// Custom hook for wishlist with trip data
// ═══════════════════════════════════════════════════════════════════════════

import { useMemo } from "react";
import { mockTrips } from "@/data/trips";
import type { Trip } from "@/types";

export function useWishlistTrips(): Trip[] {
  const items = useWishlistStore((state) => state.items);

  return useMemo(() => {
    // TODO: Replace with actual data fetching when Supabase is set up
    return mockTrips.filter((trip) => items.includes(trip.id));
  }, [items]);
}
