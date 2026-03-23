

/** Note: Product Card Props Interface */
export interface ProductCardPropsInterface  {
  _id?:string,
  coverImage?: string;
  brand?: string;
  meta?: string;
  price?: number | string;
  likes?: number | string;
  condition?: string;
  parcelSize?: string;
  isLoading?: boolean;
  isLiked?:boolean
};