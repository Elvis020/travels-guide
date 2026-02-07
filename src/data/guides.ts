/**
 * Guide Profiles - The People Who Bring Ghana to Life
 * These are the storytellers, cultural ambassadors, and trusted companions
 */

export interface Guide {
  id: string;
  name: string;
  role: string;
  years: number;
  quote: string;
  bio: string;
  image: string;
  specialties: string[];
  languages: string[];
}

export const guides: Guide[] = [
  {
    id: 'kwame',
    name: 'Kwame Asante',
    role: 'Heritage & History Guide',
    years: 12,
    quote: "I don't just show you Ghana. I help you feel it, understand it, and carry it with you forever.",
    bio: "Born in Cape Coast, Kwame grew up listening to the stories of his ancestors who traded goods along the Gold Coast. His deep connection to Ghana's history—both painful and triumphant—makes every tour a journey through time. Kwame has guided everyone from school groups to documentary filmmakers, always with the same reverence and authenticity.",
    image: '/guides/kwame.jpg',
    specialties: [
      'Cape Coast & Elmina Castles',
      'Trans-Atlantic Slave Trade History',
      'Akan Cultural Traditions',
      'Storytelling & Oral History',
    ],
    languages: ['English', 'Twi', 'Fante', 'French'],
  },
  {
    id: 'ama',
    name: 'Ama Mensah',
    role: 'Wildlife & Nature Guide',
    years: 8,
    quote: 'Every sound, every footprint, every bird call tells a story. Let me teach you how to listen.',
    bio: "Ama's passion for conservation was ignited during childhood visits to Mole National Park with her ranger father. After studying ecology at the University of Ghana, she returned to the field, becoming one of the country's few female safari guides. Her encyclopedic knowledge of Ghana's ecosystems is matched only by her infectious enthusiasm.",
    image: '/guides/ama.jpg',
    specialties: [
      'Mole National Park Safaris',
      'Bird Watching',
      'Tropical Forest Ecology',
      'Conservation Education',
    ],
    languages: ['English', 'Twi', 'Ga', 'Ewe'],
  },
  {
    id: 'kofi',
    name: 'Kofi Owusu',
    role: 'Cultural Experience Guide',
    years: 15,
    quote: "Ghana is not a place you visit. It's a feeling that visits you—and stays.",
    bio: "Kofi is a master drummer, storyteller, and cultural educator who has dedicated his life to sharing Ghanaian traditions with the world. From vibrant Accra markets to remote Ashanti villages, Kofi has relationships with communities across the country, ensuring you experience authentic hospitality and cultural exchange.",
    image: '/guides/kofi.jpg',
    specialties: [
      'Traditional Drumming & Dance',
      'Ashanti Kingdom Culture',
      'Local Market Navigation',
      'Village Homestays',
    ],
    languages: ['English', 'Twi', 'Ga', 'Hausa'],
  },
];

/**
 * Get guide by ID
 */
export const getGuideById = (id: string): Guide | undefined => {
  return guides.find((guide) => guide.id === id);
};

/**
 * Get guides by specialty
 */
export const getGuidesBySpecialty = (specialty: string): Guide[] => {
  return guides.filter((guide) =>
    guide.specialties.some((s) => s.toLowerCase().includes(specialty.toLowerCase()))
  );
};
