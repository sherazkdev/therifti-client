// types.ts

export interface Location {
  city: string;
  country: string;
}

export interface Product {
  _id: string;
  title: string;
  images: string[];
  price?: number; //
  views: number;
  favorites: number;
}

export interface Review {
  _id: string;
  author: {
    username: string;
    avatar?: string;
  };
  rating: number;
  date: string;
  text: string;
  isVerified: boolean;
}

export interface UserProfile {
  _id: string;
  username: string;
  profileImage?: string;
  isVerified: boolean;
  location: Location;
  lastSeen: string;
  followers: number;
  following: number;
  reviewsCount: number;
  averageRating: number;
  products: Product[];
  reviews: Review[];
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  profile?: UserProfile;
}
