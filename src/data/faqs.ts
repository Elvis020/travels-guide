export interface FAQItem {
  question: string;
  answer: string;
  link?: {
    text: string;
    href: string;
  };
}

export interface FAQCategory {
  title: string;
  items: FAQItem[];
}

export const faqCategories: FAQCategory[] = [
  {
    title: "General & Booking",
    items: [
      {
        question: "How do I book a tour with NYS Travels?",
        answer:
          'You can book directly through our curated "Packages" page. For custom/private tours, simply fill out our Custom Inquiry Form, and a dedicated travel consultant will contact you within 24 hours with a draft itinerary and quote.',
        link: {
          text: "View all packages",
          href: "/trips",
        },
      },
      {
        question: "What is your cancellation policy?",
        answer:
          "We understand plans change. 30+ days before travel: full refund minus a 10% admin fee. 15-30 days before travel: 50% refund. Less than 15 days: no refund, but we can often reschedule your dates for a small fee.",
      },
      {
        question: "Are your tours solo-traveler friendly?",
        answer:
          'Absolutely. Many of our group tours, like the Torcher Experience, offer a "Shared Room" option, allowing solo travelers to save money and meet like-minded explorers.',
      },
    ],
  },
  {
    title: "Custom & Private Tours",
    items: [
      {
        question: "Can I change the itinerary once the trip has started?",
        answer:
          "For private tours, yes. Within reason, your dedicated driver and guide are there to ensure you have the best experience. If you decide to spend more time at a waterfall and skip a museum, we will make it happen.",
      },
      {
        question: "Do you offer airport pickup for private clients?",
        answer:
          "Every private and custom package includes a VVIP airport transfer. We track your flight and meet you at the arrivals hall with a professional chauffeur and a chilled bottle of water, or a cold beer if that is your vibe.",
      },
    ],
  },
  {
    title: "Safety & Health",
    items: [
      {
        question: "Is it safe to travel across Ghana?",
        answer:
          "Ghana is one of the most stable and welcoming countries in Africa. At NYS Travels, we only use vetted vehicles, professional drivers, and secure accommodations with 24/7 security.",
      },
      {
        question: "Can I drink the tap water?",
        answer:
          "We do not recommend drinking tap water. NYS Travels provides unlimited bottled water on all our tour buses and private SUVs to keep you hydrated and healthy.",
      },
    ],
  },
  {
    title: "On the Road",
    items: [
      {
        question: "What should I pack?",
        answer:
          'Lightweight, breathable clothing is best. For tours like the Torcher Experience, bring sturdy walking shoes for hiking and "festive-chic" attire for the concert night. Do not forget a power bank and a high-SPF sunscreen.',
      },
      {
        question: "Is there WiFi on the bus?",
        answer:
          'Our executive Coaster buses and private SUVs are equipped with high-speed mobile WiFi. In remote areas like the deep Volta or Northern regions, connectivity can be "Ghana-standard", which means intermittent.',
      },
      {
        question: "Do you cater to specific diets?",
        answer:
          "Yes. Whether you are vegan, gluten-free, or have a nut allergy, just let us know in your pre-trip questionnaire. We coordinate with our restaurant partners, like Lamu or Aqua Safari, to ensure your meals are safe and delicious.",
      },
    ],
  },
  {
    title: "Payments & Currency",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept Mobile Money (MoMo), bank transfers, and all major credit/debit cards via our secure online portal.",
      },
      {
        question: "Can I pay in installments?",
        answer:
          'Yes. For our larger packages, we offer a "Lock & Pay" plan: pay a 30% deposit to secure your slot and clear the balance in monthly installments before the trip begins.',
      },
    ],
  },
];

export const getAllFAQs = () => faqCategories.flatMap((category) => category.items);

export const getFeaturedFAQs = () => getAllFAQs().slice(0, 3);
