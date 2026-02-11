import type { Trip, Review } from "@/types";

// ═══════════════════════════════════════════════════════════════════════════
// Mock Trip Data
// This data will be replaced with Supabase queries in production
// ═══════════════════════════════════════════════════════════════════════════

export const mockTrips: Trip[] = [
  {
    id: "1",
    slug: "maasai-mara-safari-adventure",
    title: "Maasai Mara Safari Adventure",
    subtitle: "Witness the Great Migration",
    description:
      "Experience the magic of Kenya's most iconic wildlife destination. The Maasai Mara National Reserve offers unparalleled opportunities to witness the Great Migration, where millions of wildebeest and zebras traverse the savanna. Our expert guides will take you on game drives at dawn and dusk when wildlife is most active.",
    shortDescription:
      "4-day safari adventure through Kenya's iconic Maasai Mara, home to the Big Five and the Great Migration.",
    destination: "Maasai Mara",
    country: "Kenya",
    type: "international",
    category: "group",
    dates: {
      start: "2024-03-15",
      end: "2024-03-19",
    },
    duration: 4,
    bookingDeadline: "2024-02-13", // 30 days before trip starts
    price: 1299,
    originalPrice: 1499,
    currency: "USD",
    maxParticipants: 12,
    currentBookings: 8,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Nairobi",
        description:
          "Welcome to Kenya! Upon arrival at Jomo Kenyatta International Airport, you'll be met by our representative and transferred to your hotel.",
        activities: [
          "Airport pickup",
          "Hotel check-in",
          "Welcome dinner",
          "Trip briefing",
        ],
        meals: ["dinner"],
        accommodation: "Sarova Stanley Hotel",
      },
      {
        day: 2,
        title: "Journey to the Mara",
        description:
          "After breakfast, we depart for the Maasai Mara. The scenic drive takes us through the Great Rift Valley with a stop at the viewpoint.",
        activities: [
          "Scenic drive",
          "Rift Valley viewpoint",
          "Afternoon game drive",
          "Sundowner cocktails",
        ],
        meals: ["breakfast", "lunch", "dinner"],
        accommodation: "Mara Serena Safari Lodge",
      },
      {
        day: 3,
        title: "Full Day Safari",
        description:
          "A full day exploring the Mara ecosystem. We'll search for the Big Five and witness the incredible diversity of African wildlife.",
        activities: [
          "Dawn game drive",
          "Bush breakfast",
          "Afternoon game drive",
          "Maasai village visit",
        ],
        meals: ["breakfast", "lunch", "dinner"],
        accommodation: "Mara Serena Safari Lodge",
      },
      {
        day: 4,
        title: "Return to Nairobi",
        description:
          "Final morning game drive before departing for Nairobi. Arrive in time for evening flights or extend your stay.",
        activities: [
          "Morning game drive",
          "Brunch at lodge",
          "Return drive to Nairobi",
          "Airport transfer",
        ],
        meals: ["breakfast", "lunch"],
      },
    ],
    images: [
      {
        id: "img1",
        url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200",
        alt: "Lions in Maasai Mara",
        type: "image",
      },
      {
        id: "img2",
        url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200",
        alt: "Elephant herd",
        type: "image",
      },
      {
        id: "img3",
        url: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=1200",
        alt: "Safari sunset",
        type: "image",
      },
    ],
    coverImage: {
      id: "cover1",
      url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200",
      alt: "Lions in Maasai Mara",
      type: "image",
    },
    included: [
      "Airport transfers",
      "3 nights accommodation",
      "All meals as specified",
      "Game drives in 4x4 vehicles",
      "Park entrance fees",
      "English-speaking guide",
      "Bottled water",
    ],
    excluded: [
      "International flights",
      "Travel insurance",
      "Visa fees",
      "Personal expenses",
      "Tips and gratuities",
      "Optional activities",
    ],
    meetingPoint: {
      name: "Jomo Kenyatta International Airport",
      address: "Nairobi, Kenya",
      coordinates: { lat: -1.319167, lng: 36.9275 },
    },
    difficulty: "easy",
    highlights: [
      "Big Five safari experience",
      "Great Migration viewing",
      "Luxury lodge accommodation",
      "Maasai cultural visit",
      "Professional photography opportunities",
    ],
    tags: ["safari", "wildlife", "photography", "luxury"],
    featured: true,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
  },
  {
    id: "2",
    slug: "zanzibar-beach-escape",
    title: "Zanzibar Beach Escape",
    subtitle: "Spice Island Paradise",
    description:
      "Discover the enchanting island of Zanzibar, where pristine beaches meet rich Swahili culture. Explore the UNESCO World Heritage Stone Town, snorkel in crystal-clear waters, and indulge in world-class seafood.",
    shortDescription:
      "5-day tropical getaway to Zanzibar's pristine beaches and historic Stone Town.",
    destination: "Zanzibar",
    country: "Tanzania",
    type: "international",
    category: "group",
    dates: {
      start: "2024-04-10",
      end: "2024-04-15",
    },
    duration: 5,
    bookingDeadline: "2024-03-10", // 30 days before trip starts
    price: 899,
    currency: "USD",
    maxParticipants: 16,
    currentBookings: 12,
    itinerary: [
      {
        day: 1,
        title: "Welcome to Zanzibar",
        description: "Arrival and transfer to your beachfront resort.",
        activities: ["Airport pickup", "Resort check-in", "Beach relaxation"],
        meals: ["dinner"],
        accommodation: "Diamonds La Gemma dell'Est",
      },
      {
        day: 2,
        title: "Stone Town Discovery",
        description: "Full-day exploration of historic Stone Town.",
        activities: [
          "Walking tour",
          "Spice market visit",
          "House of Wonders",
          "Sunset dhow cruise",
        ],
        meals: ["breakfast", "lunch"],
        accommodation: "Diamonds La Gemma dell'Est",
      },
      {
        day: 3,
        title: "Island Hopping",
        description: "Visit Prison Island and enjoy snorkeling.",
        activities: [
          "Boat trip",
          "Giant tortoise sanctuary",
          "Snorkeling",
          "Beach picnic",
        ],
        meals: ["breakfast", "lunch"],
        accommodation: "Diamonds La Gemma dell'Est",
      },
      {
        day: 4,
        title: "Spice Tour & Beach",
        description: "Morning spice plantation tour, afternoon at leisure.",
        activities: [
          "Spice plantation tour",
          "Cooking class",
          "Beach time",
          "Farewell dinner",
        ],
        meals: ["breakfast", "lunch", "dinner"],
        accommodation: "Diamonds La Gemma dell'Est",
      },
      {
        day: 5,
        title: "Departure",
        description: "Transfer to airport for your departure.",
        activities: ["Breakfast", "Airport transfer"],
        meals: ["breakfast"],
      },
    ],
    images: [
      {
        id: "img1",
        url: "https://images.unsplash.com/photo-1586861203927-800a5acdcc4d?w=1200",
        alt: "Zanzibar beach",
        type: "image",
      },
      {
        id: "img2",
        url: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=1200",
        alt: "Stone Town door",
        type: "image",
      },
    ],
    coverImage: {
      id: "cover2",
      url: "https://images.unsplash.com/photo-1586861203927-800a5acdcc4d?w=1200",
      alt: "Zanzibar beach",
      type: "image",
    },
    included: [
      "Airport transfers",
      "4 nights beachfront accommodation",
      "Daily breakfast",
      "Stone Town tour",
      "Spice tour",
      "Island hopping trip",
      "Sunset dhow cruise",
    ],
    excluded: [
      "International flights",
      "Travel insurance",
      "Visa fees",
      "Lunches and dinners not specified",
      "Personal expenses",
    ],
    meetingPoint: {
      name: "Abeid Amani Karume International Airport",
      address: "Zanzibar, Tanzania",
    },
    difficulty: "easy",
    highlights: [
      "UNESCO Stone Town",
      "Pristine beaches",
      "Spice plantation tour",
      "Snorkeling",
      "Dhow sailing",
    ],
    tags: ["beach", "culture", "relaxation", "snorkeling"],
    featured: true,
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-02-05T00:00:00Z",
  },
  {
    id: "3",
    slug: "local-wine-country-tour",
    title: "Wine Country Weekend",
    subtitle: "Vineyards & Gastronomy",
    description:
      "Escape to the rolling hills of wine country for a weekend of world-class wines, gourmet dining, and scenic beauty. Visit award-winning wineries, enjoy private tastings, and savor farm-to-table cuisine.",
    shortDescription:
      "2-day wine tasting journey through picturesque vineyards with gourmet dining experiences.",
    destination: "Napa Valley",
    country: "United States",
    type: "local",
    category: "group",
    dates: {
      start: "2024-03-22",
      end: "2024-03-24",
    },
    duration: 2,
    bookingDeadline: "2024-02-20", // 30 days before trip starts
    price: 449,
    currency: "USD",
    maxParticipants: 10,
    currentBookings: 6,
    itinerary: [
      {
        day: 1,
        title: "Winery Exploration",
        description: "Visit three acclaimed wineries with guided tastings.",
        activities: [
          "Morning departure",
          "First winery visit",
          "Vineyard lunch",
          "Two afternoon tastings",
          "Gourmet dinner",
        ],
        meals: ["lunch", "dinner"],
        accommodation: "Meadowood Napa Valley",
      },
      {
        day: 2,
        title: "Culinary Experience",
        description: "Cooking class and final winery visit.",
        activities: [
          "Farm breakfast",
          "Cooking class",
          "Private cellar tour",
          "Farewell toast",
        ],
        meals: ["breakfast", "lunch"],
      },
    ],
    images: [
      {
        id: "img1",
        url: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200",
        alt: "Wine vineyard",
        type: "image",
      },
    ],
    coverImage: {
      id: "cover3",
      url: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200",
      alt: "Wine vineyard",
      type: "image",
    },
    included: [
      "Luxury transportation",
      "1 night accommodation",
      "All tastings and tours",
      "Meals as specified",
      "Wine guide",
    ],
    excluded: ["Wine purchases", "Personal expenses", "Tips"],
    meetingPoint: {
      name: "Downtown Meeting Point",
      address: "123 Main Street, San Francisco",
    },
    difficulty: "easy",
    highlights: [
      "Award-winning wineries",
      "Private tastings",
      "Gourmet cuisine",
      "Scenic drives",
    ],
    tags: ["wine", "food", "luxury", "weekend"],
    featured: false,
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-10T00:00:00Z",
  },
  {
    id: "4",
    slug: "mount-kilimanjaro-trek",
    title: "Kilimanjaro Summit Trek",
    subtitle: "Roof of Africa",
    description:
      "Conquer Africa's highest peak on this challenging 7-day trek. Our experienced guides will lead you through five distinct climate zones to the summit at 5,895 meters. A life-changing adventure awaits.",
    shortDescription:
      "7-day guided trek to the summit of Mount Kilimanjaro via the scenic Machame Route.",
    destination: "Mount Kilimanjaro",
    country: "Tanzania",
    type: "international",
    category: "group",
    dates: {
      start: "2024-05-01",
      end: "2024-05-08",
    },
    duration: 7,
    bookingDeadline: "2024-04-01", // 30 days before trip starts
    price: 2199,
    currency: "USD",
    maxParticipants: 8,
    currentBookings: 5,
    itinerary: [
      {
        day: 1,
        title: "Machame Gate to Machame Camp",
        description: "Trek through rainforest to our first camp.",
        activities: ["Registration", "Rainforest trek", "Camp setup"],
        meals: ["lunch", "dinner"],
        accommodation: "Machame Camp (3,000m)",
      },
      {
        day: 2,
        title: "Machame Camp to Shira Camp",
        description: "Ascend through moorland to Shira Plateau.",
        activities: ["Morning trek", "Acclimatization hike", "Evening briefing"],
        meals: ["breakfast", "lunch", "dinner"],
        accommodation: "Shira Camp (3,840m)",
      },
      {
        day: 3,
        title: "Shira Camp to Barranco Camp",
        description: "Cross the Shira Plateau toward Lava Tower.",
        activities: ["Lava Tower ascent", "Acclimatization", "Descent to Barranco"],
        meals: ["breakfast", "lunch", "dinner"],
        accommodation: "Barranco Camp (3,950m)",
      },
      {
        day: 4,
        title: "Barranco Wall to Karanga Camp",
        description: "Climb the famous Barranco Wall.",
        activities: ["Wall climb", "Scenic trek", "Rest afternoon"],
        meals: ["breakfast", "lunch", "dinner"],
        accommodation: "Karanga Camp (4,035m)",
      },
      {
        day: 5,
        title: "Karanga to Barafu Camp",
        description: "Final preparations for summit attempt.",
        activities: ["Short trek", "Equipment check", "Early dinner", "Rest"],
        meals: ["breakfast", "lunch", "dinner"],
        accommodation: "Barafu Camp (4,640m)",
      },
      {
        day: 6,
        title: "Summit Day",
        description: "Midnight start for Uhuru Peak summit.",
        activities: [
          "Midnight departure",
          "Summit at sunrise",
          "Descent to Mweka",
        ],
        meals: ["breakfast", "lunch", "dinner"],
        accommodation: "Mweka Camp (3,100m)",
      },
      {
        day: 7,
        title: "Descent to Gate",
        description: "Final descent and celebration.",
        activities: ["Rainforest descent", "Certificate ceremony", "Transfer"],
        meals: ["breakfast", "lunch"],
      },
    ],
    images: [
      {
        id: "img1",
        url: "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?w=1200",
        alt: "Kilimanjaro summit",
        type: "image",
      },
    ],
    coverImage: {
      id: "cover4",
      url: "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?w=1200",
      alt: "Kilimanjaro summit",
      type: "image",
    },
    included: [
      "Park fees",
      "Professional guides and porters",
      "All meals on mountain",
      "Camping equipment",
      "Emergency oxygen",
      "Certificate",
    ],
    excluded: [
      "Flights",
      "Travel insurance (required)",
      "Personal gear",
      "Tips for crew",
      "Hotel before/after",
    ],
    meetingPoint: {
      name: "Kilimanjaro International Airport",
      address: "Arusha, Tanzania",
    },
    difficulty: "challenging",
    highlights: [
      "Africa's highest peak",
      "Five climate zones",
      "Sunrise summit",
      "Expert mountain guides",
      "Small group experience",
    ],
    tags: ["trekking", "adventure", "mountains", "bucket-list"],
    featured: true,
    createdAt: "2024-01-25T00:00:00Z",
    updatedAt: "2024-02-12T00:00:00Z",
  },
  {
    id: "5",
    slug: "tokyo-culture-food-tour",
    title: "Tokyo Culture & Food Tour",
    subtitle: "Tradition Meets Innovation",
    description:
      "Immerse yourself in the fascinating contrasts of Tokyo. From ancient temples to neon-lit streets, traditional tea ceremonies to world-class sushi, this tour reveals the soul of Japan's captivating capital.",
    shortDescription:
      "6-day cultural immersion in Tokyo exploring temples, cuisine, and modern Japanese life.",
    destination: "Tokyo",
    country: "Japan",
    type: "international",
    category: "group",
    dates: {
      start: "2024-04-05",
      end: "2024-04-11",
    },
    duration: 6,
    bookingDeadline: "2024-03-05", // 30 days before trip starts
    price: 1899,
    currency: "USD",
    maxParticipants: 14,
    currentBookings: 9,
    itinerary: [
      {
        day: 1,
        title: "Welcome to Tokyo",
        description: "Arrival and introduction to Japanese culture.",
        activities: ["Airport transfer", "Neighborhood walk", "Welcome dinner"],
        meals: ["dinner"],
        accommodation: "Park Hyatt Tokyo",
      },
      {
        day: 2,
        title: "Traditional Tokyo",
        description: "Explore historic temples and gardens.",
        activities: ["Senso-ji Temple", "Meiji Shrine", "Harajuku", "Tea ceremony"],
        meals: ["breakfast"],
        accommodation: "Park Hyatt Tokyo",
      },
      {
        day: 3,
        title: "Culinary Exploration",
        description: "Tsukiji Market and cooking class.",
        activities: ["Market tour", "Sushi breakfast", "Cooking class", "Sake tasting"],
        meals: ["breakfast", "lunch"],
        accommodation: "Park Hyatt Tokyo",
      },
      {
        day: 4,
        title: "Day Trip to Hakone",
        description: "Hot springs and Mount Fuji views.",
        activities: ["Bullet train", "Onsen experience", "Lake cruise", "Views of Fuji"],
        meals: ["breakfast", "lunch"],
        accommodation: "Park Hyatt Tokyo",
      },
      {
        day: 5,
        title: "Modern Tokyo",
        description: "Technology, fashion, and pop culture.",
        activities: ["Akihabara", "Shibuya Crossing", "TeamLab", "Karaoke night"],
        meals: ["breakfast", "dinner"],
        accommodation: "Park Hyatt Tokyo",
      },
      {
        day: 6,
        title: "Farewell",
        description: "Free morning and departure.",
        activities: ["Optional shopping", "Airport transfer"],
        meals: ["breakfast"],
      },
    ],
    images: [
      {
        id: "img1",
        url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200",
        alt: "Tokyo skyline",
        type: "image",
      },
      {
        id: "img2",
        url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200",
        alt: "Japanese temple",
        type: "image",
      },
    ],
    coverImage: {
      id: "cover5",
      url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200",
      alt: "Tokyo skyline",
      type: "image",
    },
    included: [
      "5 nights luxury accommodation",
      "Daily breakfast",
      "All tours and activities",
      "Hakone day trip with bullet train",
      "Cooking class",
      "English-speaking guide",
    ],
    excluded: [
      "International flights",
      "Travel insurance",
      "Meals not specified",
      "Personal expenses",
    ],
    meetingPoint: {
      name: "Narita International Airport",
      address: "Tokyo, Japan",
    },
    difficulty: "easy",
    highlights: [
      "Ancient temples",
      "Tsukiji Market",
      "Mount Fuji views",
      "Tea ceremony",
      "TeamLab immersive art",
    ],
    tags: ["culture", "food", "city", "japan"],
    featured: false,
    createdAt: "2024-02-05T00:00:00Z",
    updatedAt: "2024-02-15T00:00:00Z",
  },
  {
    id: "6",
    slug: "local-hiking-adventure",
    title: "Mountain Trail Adventure",
    subtitle: "Scenic Day Hike",
    description:
      "Join us for a rewarding day hike through stunning mountain trails. Perfect for intermediate hikers looking to explore beautiful landscapes, waterfalls, and panoramic viewpoints.",
    shortDescription:
      "Full-day guided hiking adventure through scenic mountain trails with waterfalls.",
    destination: "Blue Ridge Mountains",
    country: "United States",
    type: "local",
    category: "group",
    dates: {
      start: "2024-03-30",
      end: "2024-03-30",
    },
    duration: 1,
    bookingDeadline: "2024-03-23", // 7 days before (short trip)
    price: 89,
    currency: "USD",
    maxParticipants: 15,
    currentBookings: 11,
    itinerary: [
      {
        day: 1,
        title: "Mountain Trail Hike",
        description: "Full day hiking adventure.",
        activities: [
          "Morning meetup",
          "Trail briefing",
          "Waterfall stop",
          "Summit picnic",
          "Scenic descent",
        ],
        meals: ["lunch"],
      },
    ],
    images: [
      {
        id: "img1",
        url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200",
        alt: "Mountain hiking",
        type: "image",
      },
    ],
    coverImage: {
      id: "cover6",
      url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200",
      alt: "Mountain hiking",
      type: "image",
    },
    included: [
      "Expert guide",
      "Trail snacks and lunch",
      "First aid support",
      "Group photo",
    ],
    excluded: ["Transportation to trailhead", "Hiking gear", "Travel insurance"],
    meetingPoint: {
      name: "Mountain Trailhead Parking",
      address: "Highway 52, Blue Ridge",
    },
    difficulty: "moderate",
    highlights: [
      "Waterfall views",
      "Mountain summit",
      "Wildlife spotting",
      "Photography opportunities",
    ],
    tags: ["hiking", "nature", "day-trip", "outdoors"],
    featured: false,
    createdAt: "2024-02-10T00:00:00Z",
    updatedAt: "2024-02-18T00:00:00Z",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// Mock Reviews Data
// ═══════════════════════════════════════════════════════════════════════════

export const mockReviews: Review[] = [
  {
    id: "r1",
    tripId: "1",
    userId: "u1",
    userName: "Sarah Mitchell",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    rating: 5,
    title: "Once in a lifetime experience!",
    content:
      "The Maasai Mara safari exceeded all my expectations. Our guide was incredibly knowledgeable, and we saw all of the Big Five! The lodges were luxurious and the food was amazing. I'll never forget watching the sunrise over the savanna.",
    verified: true,
    helpful: 24,
    createdAt: "2024-02-15T00:00:00Z",
  },
  {
    id: "r2",
    tripId: "1",
    userId: "u2",
    userName: "James Thompson",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    rating: 5,
    title: "Best safari company ever",
    content:
      "This was my third safari in Africa and by far the best organized. The attention to detail, the quality of the vehicles, and the expertise of the guides made this trip unforgettable.",
    verified: true,
    helpful: 18,
    createdAt: "2024-02-10T00:00:00Z",
  },
  {
    id: "r3",
    tripId: "2",
    userId: "u3",
    userName: "Emily Chen",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    rating: 4,
    title: "Beautiful beaches, great culture",
    content:
      "Zanzibar is paradise! The Stone Town tour was fascinating and our guide really brought the history to life. The beaches were pristine. Only giving 4 stars because I wish we had more free time to explore on our own.",
    verified: true,
    helpful: 12,
    createdAt: "2024-02-08T00:00:00Z",
  },
  {
    id: "r4",
    tripId: "4",
    userId: "u4",
    userName: "Michael Roberts",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    rating: 5,
    title: "I made it to the top!",
    content:
      "Climbing Kilimanjaro was the hardest thing I've ever done, but also the most rewarding. The guides were exceptional - they monitored our health constantly and kept our spirits high. Reaching Uhuru Peak at sunrise was magical.",
    verified: true,
    helpful: 31,
    createdAt: "2024-01-28T00:00:00Z",
  },
  {
    id: "r5",
    tripId: "5",
    userId: "u5",
    userName: "Amanda Foster",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    rating: 5,
    title: "Tokyo came alive for us",
    content:
      "What an incredible way to experience Tokyo! The cooking class was a highlight - we learned to make authentic ramen from scratch. The mix of traditional and modern activities was perfect. Our guide Yuki was fantastic!",
    verified: true,
    helpful: 15,
    createdAt: "2024-02-20T00:00:00Z",
  },
  {
    id: "r6",
    tripId: "3",
    userId: "u6",
    userName: "David Wilson",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    rating: 5,
    title: "Perfect wine country escape",
    content:
      "Such a lovely weekend getaway! The wineries selected were top-notch, and the private tastings made us feel special. The cooking class was a nice touch. Highly recommend for couples or small groups.",
    verified: true,
    helpful: 9,
    createdAt: "2024-02-12T00:00:00Z",
  },
];

// Helper functions to work with mock data
export function getTripBySlug(slug: string): Trip | undefined {
  return mockTrips.find((trip) => trip.slug === slug);
}

export function getTripById(id: string): Trip | undefined {
  return mockTrips.find((trip) => trip.id === id);
}

export function getFeaturedTrips(): Trip[] {
  return mockTrips.filter((trip) => trip.featured);
}

export function getTripsByType(type: "local" | "international"): Trip[] {
  return mockTrips.filter((trip) => trip.type === type);
}

export function getReviewsByTripId(tripId: string): Review[] {
  return mockReviews.filter((review) => review.tripId === tripId);
}

export function getAverageRating(tripId: string): number {
  const reviews = getReviewsByTripId(tripId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}
