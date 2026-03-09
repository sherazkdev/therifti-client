export type SelectedCategory = {
  path: string[];
};

export type FormValues = {
  title: string;
  price: number;
  description: string;
  parcelSize: string;
};

export const PRODUCT_CONDITION = ["NEW_WITH_TAGS","NEW_WITHOUT_TAGS","VERY_GOOD","GOOD","SATISFACTORY"] as const;
export type ProductCondition = typeof PRODUCT_CONDITION[number];

/** Note: Product Parcel size array */
export const PRODUCT_PARCEL_SIZE = [
  "SMALL",
  "MEDIUM",
  "LARGE"
] as const;
export type ProductParcelSize = typeof PRODUCT_PARCEL_SIZE[number];

/** @note: Parcel Size Interface */
export interface ParcelSizeInterface {
  parcelSize:ProductParcelSize,
  info:string
}

/** Note: Product Status array */
export const PRODUCT_STATUS = [
  "DRAFT",
  "PUBLISHED",
  "DELETED",
  "SOLD"
] as const;
export type ProductStatus = typeof PRODUCT_STATUS[number];
