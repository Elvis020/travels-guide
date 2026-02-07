import type { GalleryItem } from "@/types";

// ═══════════════════════════════════════════════════════════════════════════
// Gallery Data - African Tourist Destinations
// Showcasing the beauty and diversity of Africa
// ═══════════════════════════════════════════════════════════════════════════

export const galleryItems: GalleryItem[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // Kenya - Maasai Mara & Wildlife
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "g1",
    url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=80",
    alt: "Lions resting in the Maasai Mara savanna at golden hour",
    type: "image",
    caption: "Pride of lions in the Maasai Mara",
    tripId: "1",
    tripName: "Maasai Mara Safari Adventure",
    date: "2024-01-15",
    featured: true,
  },
  {
    id: "g2",
    url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80",
    alt: "Elephant herd crossing the savanna with Mount Kilimanjaro in background",
    type: "image",
    caption: "Elephant migration in Amboseli",
    tripName: "Kenya Wildlife Safari",
    date: "2024-01-20",
    featured: true,
  },
  {
    id: "g3",
    url: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=1200&q=80",
    alt: "Stunning African sunset over the savanna with acacia trees",
    type: "image",
    caption: "Sunset over the Serengeti",
    tripName: "Serengeti Explorer",
    date: "2024-02-05",
    featured: false,
  },
  {
    id: "g4",
    url: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=1200&q=80",
    alt: "Giraffe walking through golden grass in African savanna",
    type: "image",
    caption: "Graceful giraffe in the wild",
    tripId: "1",
    tripName: "Maasai Mara Safari Adventure",
    date: "2024-01-16",
    featured: false,
  },
  {
    id: "g5",
    url: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=1200&q=80",
    alt: "Zebras grazing in the Maasai Mara during the Great Migration",
    type: "image",
    caption: "The Great Migration - Zebras",
    tripId: "1",
    tripName: "Maasai Mara Safari Adventure",
    date: "2024-01-17",
    featured: true,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Tanzania - Kilimanjaro & Zanzibar
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "g6",
    url: "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?w=1200&q=80",
    alt: "Mount Kilimanjaro snow-capped peak at sunrise",
    type: "image",
    caption: "Kilimanjaro Summit at Sunrise",
    tripId: "4",
    tripName: "Kilimanjaro Summit Trek",
    date: "2024-02-10",
    featured: true,
  },
  {
    id: "g7",
    url: "https://images.unsplash.com/photo-1586861203927-800a5acdcc4d?w=1200&q=80",
    alt: "Crystal clear turquoise waters of Zanzibar beach",
    type: "image",
    caption: "Paradise beaches of Zanzibar",
    tripId: "2",
    tripName: "Zanzibar Beach Escape",
    date: "2024-03-01",
    featured: true,
  },
  {
    id: "g8",
    url: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=1200&q=80",
    alt: "Colorful carved door in Stone Town, Zanzibar",
    type: "image",
    caption: "Historic Stone Town Architecture",
    tripId: "2",
    tripName: "Zanzibar Beach Escape",
    date: "2024-03-02",
    featured: false,
  },
  {
    id: "g9",
    url: "https://images.unsplash.com/photo-1504432842672-1a79f78e4084?w=1200&q=80",
    alt: "Climbers ascending Mount Kilimanjaro with clouds below",
    type: "image",
    caption: "Above the clouds on Kilimanjaro",
    tripId: "4",
    tripName: "Kilimanjaro Summit Trek",
    date: "2024-02-12",
    featured: false,
  },
  {
    id: "g10",
    url: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1200&q=80",
    alt: "Traditional dhow boat sailing at sunset in Zanzibar",
    type: "image",
    caption: "Dhow sailing at sunset",
    tripId: "2",
    tripName: "Zanzibar Beach Escape",
    date: "2024-03-03",
    featured: true,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // South Africa - Cape Town & Safari
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "g11",
    url: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1200&q=80",
    alt: "Table Mountain overlooking Cape Town city and harbor",
    type: "image",
    caption: "Iconic Table Mountain, Cape Town",
    tripName: "Cape Town Explorer",
    date: "2024-02-20",
    featured: true,
  },
  {
    id: "g12",
    url: "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=1200&q=80",
    alt: "African penguins on Boulders Beach, South Africa",
    type: "image",
    caption: "Penguins at Boulders Beach",
    tripName: "Cape Town Explorer",
    date: "2024-02-21",
    featured: false,
  },
  {
    id: "g13",
    url: "https://images.unsplash.com/photo-1516246843873-9d12356b6fab?w=1200&q=80",
    alt: "Leopard resting on a tree branch in Kruger National Park",
    type: "image",
    caption: "Leopard in Kruger National Park",
    tripName: "South Africa Big Five Safari",
    date: "2024-02-25",
    featured: true,
  },
  {
    id: "g14",
    url: "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=1200&q=80",
    alt: "Cape of Good Hope dramatic coastline",
    type: "image",
    caption: "Cape of Good Hope",
    tripName: "Cape Town Explorer",
    date: "2024-02-22",
    featured: false,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Morocco - Marrakech & Sahara
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "g15",
    url: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=1200&q=80",
    alt: "Vibrant blue streets of Chefchaouen, Morocco",
    type: "image",
    caption: "The Blue Pearl - Chefchaouen",
    tripName: "Morocco Discovery",
    date: "2024-01-25",
    featured: true,
  },
  {
    id: "g16",
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    alt: "Sahara Desert sand dunes at sunset with camel caravan",
    type: "image",
    caption: "Sahara Desert Camel Trek",
    tripName: "Morocco Desert Adventure",
    date: "2024-01-28",
    featured: true,
  },
  {
    id: "g17",
    url: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200&q=80",
    alt: "Ornate archways in Marrakech medina",
    type: "image",
    caption: "Marrakech Medina Architecture",
    tripName: "Morocco Discovery",
    date: "2024-01-26",
    featured: false,
  },
  {
    id: "g18",
    url: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=1200&q=80",
    alt: "Traditional Moroccan tagine meal",
    type: "image",
    caption: "Authentic Moroccan Cuisine",
    tripName: "Morocco Culinary Journey",
    date: "2024-01-27",
    featured: false,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Egypt - Ancient Wonders
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "g19",
    url: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=1200&q=80",
    alt: "Great Pyramids of Giza with Sphinx at sunset",
    type: "image",
    caption: "The Great Pyramids of Giza",
    tripName: "Egypt Ancient Wonders",
    date: "2024-03-10",
    featured: true,
  },
  {
    id: "g20",
    url: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=1200&q=80",
    alt: "Luxor Temple illuminated at night",
    type: "image",
    caption: "Luxor Temple by Night",
    tripName: "Egypt Ancient Wonders",
    date: "2024-03-12",
    featured: false,
  },
  {
    id: "g21",
    url: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=1200&q=80",
    alt: "Felucca sailboat on the Nile River at sunset",
    type: "image",
    caption: "Sailing the Nile",
    tripName: "Nile River Cruise",
    date: "2024-03-14",
    featured: true,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Victoria Falls & Botswana
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "g22",
    url: "https://images.unsplash.com/photo-1580746738099-78d6833b3e86?w=1200&q=80",
    alt: "Majestic Victoria Falls with rainbow",
    type: "image",
    caption: "Victoria Falls - The Smoke that Thunders",
    tripName: "Victoria Falls Adventure",
    date: "2024-02-28",
    featured: true,
  },
  {
    id: "g23",
    url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
    alt: "Okavango Delta waterways from aerial view",
    type: "image",
    caption: "Okavango Delta, Botswana",
    tripName: "Botswana Safari Experience",
    date: "2024-03-05",
    featured: true,
  },
  {
    id: "g24",
    url: "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?w=1200&q=80",
    alt: "Hippos in the Okavango Delta waters",
    type: "image",
    caption: "Hippos in their natural habitat",
    tripName: "Botswana Safari Experience",
    date: "2024-03-06",
    featured: false,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Rwanda & Uganda - Gorillas
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "g25",
    url: "https://images.unsplash.com/photo-1521651201144-634f700b36ef?w=1200&q=80",
    alt: "Mountain gorilla in Volcanoes National Park, Rwanda",
    type: "image",
    caption: "Mountain Gorilla Encounter",
    tripName: "Rwanda Gorilla Trek",
    date: "2024-02-15",
    featured: true,
  },
  {
    id: "g26",
    url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80",
    alt: "Misty mountains of Bwindi Impenetrable Forest",
    type: "image",
    caption: "Bwindi Impenetrable Forest",
    tripName: "Uganda Primate Safari",
    date: "2024-02-18",
    featured: false,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Namibia - Deserts & Wildlife
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "g27",
    url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80",
    alt: "Sossusvlei red sand dunes at sunrise, Namibia",
    type: "image",
    caption: "Sossusvlei Dunes at Sunrise",
    tripName: "Namibia Desert Explorer",
    date: "2024-03-15",
    featured: true,
  },
  {
    id: "g28",
    url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80",
    alt: "Deadvlei's ancient camelthorn trees",
    type: "image",
    caption: "The surreal Deadvlei",
    tripName: "Namibia Desert Explorer",
    date: "2024-03-16",
    featured: false,
  },
  {
    id: "g29",
    url: "https://images.unsplash.com/photo-1534177616064-ef0845d1dba0?w=1200&q=80",
    alt: "Desert-adapted elephants in Damaraland",
    type: "image",
    caption: "Desert Elephants of Namibia",
    tripName: "Namibia Wildlife Safari",
    date: "2024-03-18",
    featured: true,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Ethiopia - Culture & History
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "g30",
    url: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&q=80",
    alt: "Rock-hewn churches of Lalibela, Ethiopia",
    type: "image",
    caption: "Lalibela Rock Churches",
    tripName: "Ethiopia Historic Route",
    date: "2024-03-20",
    featured: true,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// Helper Functions
// ═══════════════════════════════════════════════════════════════════════════

export function getFeaturedGalleryItems(): GalleryItem[] {
  return galleryItems.filter((item) => item.featured);
}

export function getGalleryItemsByTrip(tripId: string): GalleryItem[] {
  return galleryItems.filter((item) => item.tripId === tripId);
}

export function getGalleryItemsByFilter(filter: "all" | "previous" | "upcoming"): GalleryItem[] {
  const today = new Date();

  if (filter === "all") return galleryItems;

  return galleryItems.filter((item) => {
    if (!item.date) return filter === "previous";
    const itemDate = new Date(item.date);
    return filter === "previous" ? itemDate < today : itemDate >= today;
  });
}

// Get unique trip names for filtering
export function getGalleryTripNames(): string[] {
  const names = new Set<string>();
  galleryItems.forEach((item) => {
    if (item.tripName) names.add(item.tripName);
  });
  return Array.from(names).sort();
}
