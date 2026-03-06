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

export type MultiProps = {
  label: string;
  options: string[];
  selected: string[];
  setSelected: (val: string[]) => void;
  error?: string;
  singleSelect?: boolean;
  maxSelect?: number;
};