export interface Review {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  quote: string;
  trip: string;
  date: string;
  featured?: boolean;
}

export const reviews: Review[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    location: "Atlanta, USA",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    rating: 5,
    quote: "Ghana didn't just meet my expectations—it rewrote them. Every moment was magical.",
    trip: "7-Day Cultural Explorer",
    date: "January 2026",
    featured: true,
  },
  {
    id: "2",
    name: "Marcus Johnson",
    location: "Chicago, USA",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 5,
    quote: "This was more than a trip—it was a homecoming. Nana made sure every detail was perfect.",
    trip: "10-Day Complete Experience",
    date: "December 2025",
    featured: true,
  },
  {
    id: "3",
    name: "Jennifer Lee",
    location: "Los Angeles, USA",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 5,
    quote: "The history, the culture, the people—everything exceeded my wildest dreams. I'll be back!",
    trip: "7-Day Cultural Explorer",
    date: "November 2025",
    featured: true,
  },
  {
    id: "4",
    name: "David Thompson",
    location: "Houston, USA",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    rating: 5,
    quote: "An unforgettable journey through history and culture. The guides were incredible!",
    trip: "10-Day Complete Experience",
    date: "October 2025",
  },
  {
    id: "5",
    name: "Aisha Williams",
    location: "New York, USA",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    rating: 5,
    quote: "I found pieces of myself I didn't know were missing. Ghana is pure magic.",
    trip: "7-Day Cultural Explorer",
    date: "September 2025",
  },
  {
    id: "6",
    name: "James Anderson",
    location: "Miami, USA",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    rating: 5,
    quote: "From Cape Coast to Kumasi, every stop was thoughtfully planned. Outstanding experience!",
    trip: "10-Day Complete Experience",
    date: "August 2025",
  },
  {
    id: "7",
    name: "Nicole Brown",
    location: "Boston, USA",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    rating: 5,
    quote: "The cultural immersion was real and authentic. Not your typical tourist experience!",
    trip: "7-Day Cultural Explorer",
    date: "July 2025",
  },
  {
    id: "8",
    name: "Robert Davis",
    location: "Seattle, USA",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 5,
    quote: "Seeing elephants in Mole Park was just one of many highlights. Absolutely incredible!",
    trip: "10-Day Complete Experience",
    date: "June 2025",
  },
];

export const getFeaturedReviews = () => reviews.filter((review) => review.featured);
export const getRecentReviews = (count: number = 5) => reviews.slice(0, count);
