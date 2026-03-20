export interface Category {
  parent: string;
  main: string;
  sub: string;
}

export interface User {
  _id: string;
  username: string;
  profileImage?: string;
  location?: { city: string; country: string };
  lastSeen?: string;
}

export interface Product {
  _id: string;
  title: string;
  name: string;
  price: number;
  condition: string;
  brand: string;
  size: string;
  colors: string[];
  images: string[];
  createdAt: string;
  likes?: string[];
  category?: Category;
  user?: User;
}