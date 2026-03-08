export type SelectedCategory = {
  path: string[];
};

export type FormValues = {
  title: string;
  price: number;
  description: string;
  parcelSize: string;
};

export type ListingStatus = "PUBLISHED" | "DRAFT";
