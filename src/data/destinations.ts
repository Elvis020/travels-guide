/**
 * Featured Destinations - The Places That Call to You
 * Each destination is a chapter in your Ghana story
 */

export interface Destination {
  id: string;
  name: string;
  region: string;
  hook: string; // Emotional one-liner
  description: string;
  image: string;
  mobileImage?: string; // Optimized for mobile
  highlights: string[];
  bestTime: string;
  activities: string[];
}

export const destinations: Destination[] = [
  {
    id: 'cape-coast',
    name: 'Cape Coast',
    region: 'Central Region',
    hook: 'Where history echoes in every wave',
    description:
      "Stand at the Door of No Return and feel the weight of centuries. Cape Coast Castle is more than a monument—it's a place of remembrance, education, and healing. The Atlantic winds carry stories of resilience and survival.",
    image: '/destinations/cape-coast.jpg',
    mobileImage: '/destinations/cape-coast-mobile.jpg',
    highlights: [
      'Cape Coast & Elmina Castles (UNESCO Sites)',
      'Kakum National Park Canopy Walkway',
      'Assin Manso Ancestral River',
      'Coastal fishing villages',
    ],
    bestTime: 'November - March (dry season)',
    activities: [
      'Historical tours',
      'Canopy walking',
      'Beach visits',
      'Cultural performances',
    ],
  },
  {
    id: 'mole',
    name: 'Mole National Park',
    region: 'Northern Region',
    hook: 'Walk with elephants at the watering hole',
    description:
      "Ghana's largest wildlife refuge is a place of raw beauty and unexpected encounters. Watch elephants bathe at sunrise, track antelopes through savannah grass, and sleep under skies so clear you can see the Milky Way.",
    image: '/destinations/mole.jpg',
    mobileImage: '/destinations/mole-mobile.jpg',
    highlights: [
      'Elephant & antelope safaris',
      'Guided walking safaris',
      'Bird watching (300+ species)',
      "Larabanga Mosque (oldest in West Africa)",
    ],
    bestTime: 'December - April (dry season, best wildlife viewing)',
    activities: [
      'Game drives',
      'Walking safaris',
      'Photography',
      'Cultural village visits',
    ],
  },
  {
    id: 'kumasi',
    name: 'Kumasi',
    region: 'Ashanti Region',
    hook: 'Where kings still reign and tradition thrives',
    description:
      "The beating heart of the Ashanti Kingdom, Kumasi is a city where ancient traditions coexist with modern life. Visit the Manhyia Palace, explore vibrant Kejetia Market, and witness ceremonies that have been performed for centuries.",
    image: '/destinations/kumasi.jpg',
    mobileImage: '/destinations/kumasi-mobile.jpg',
    highlights: [
      'Manhyia Palace Museum',
      "Kejetia Market (West Africa's largest)",
      'Kente weaving villages (Bonwire & Adanwomase)',
      'Adinkra symbol workshops',
    ],
    bestTime: 'Year-round (cooler in November - February)',
    activities: [
      'Palace tours',
      'Market exploration',
      'Craft workshops',
      'Traditional ceremonies',
    ],
  },
  {
    id: 'volta',
    name: 'Volta Region',
    region: 'Eastern Ghana',
    hook: 'Waterfalls, mountains, and villages in the clouds',
    description:
      'Lush green hills, cascading waterfalls, and the warmest welcomes in Ghana. The Volta Region is where adventure meets serenity. Hike to hidden waterfalls, meet traditional chiefs in mountain villages, and feel truly alive.',
    image: '/destinations/volta.jpg',
    mobileImage: '/destinations/volta-mobile.jpg',
    highlights: [
      "Wli Waterfalls (Ghana's tallest)",
      "Mount Afadja (highest peak in Ghana)",
      'Tafi Monkey Sanctuary',
      'Traditional Ewe villages',
    ],
    bestTime: 'November - April (waterfalls are fullest in rainy season)',
    activities: [
      'Waterfall hiking',
      'Mountain trekking',
      'Village homestays',
      'Kente weaving',
    ],
  },
];

/**
 * Get destination by ID
 */
export const getDestinationById = (id: string): Destination | undefined => {
  return destinations.find((dest) => dest.id === id);
};

/**
 * Get destinations by region
 */
export const getDestinationsByRegion = (region: string): Destination[] => {
  return destinations.filter((dest) =>
    dest.region.toLowerCase().includes(region.toLowerCase())
  );
};

/**
 * Get destinations by activity
 */
export const getDestinationsByActivity = (activity: string): Destination[] => {
  return destinations.filter((dest) =>
    dest.activities.some((a) => a.toLowerCase().includes(activity.toLowerCase()))
  );
};
