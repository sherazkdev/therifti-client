// mockData.ts
import type { UserProfile } from "./types";

export const mockProfileData: UserProfile = {
  _id: "user_12345",
  username: "VintageKing",
  profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80", // Khali chhorne se component default image utha lega
  isVerified: true,
  location: {
    city: "Lahore", // Aap apni marzi ki location daal sakte hain
    country: "Pakistan",
  },
  lastSeen: new Date().toISOString(),
  followers: 1240,
  following: 45,
  reviewsCount: 342,
  averageRating: 4.8,
  products: [
    {
      _id: "prod_1",
      title: "Vintage Denim Jacket",
      images: ["https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=400"],
      price: 45.0,
      views: 120,
      favorites: 15,
    },
    {
      _id: "prod_2",
      title: "Retro 90s Windbreaker",
      images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400"],
      price: 30.0,
      views: 85,
      favorites: 8,
    },
    {
      _id: "prod_3",
      title: "Classic Leather Boots",
      images: ["https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=400"],
      price: 80.0,
      views: 210,
      favorites: 32,
    }
  ],
  reviews: [
    {
      _id: "rev_1",
      author: {
        username: "CatLover92",
        avatar: "",
      },
      rating: 5,
      date: "22 Jul",
      text: "Amazing seller! The jacket was exactly as described and shipped super fast. Highly recommend!",
      isVerified: true,
    },
    {
      _id: "rev_2",
      author: {
        username: "SneakerHead_99",
        avatar: "",
      },
      rating: 4,
      date: "15 Jun",
      text: "Good communication and fair prices. The item had a slight mark not shown in pictures, but overall a good experience.",
      isVerified: true,
    }
  ]
};