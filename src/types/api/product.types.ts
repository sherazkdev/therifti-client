import type { ParcelSizeInterface, ProductCondition, ProductParcelSize, ProductStatus } from "../components";
import type { BrandDocument } from "./brand.types";
import type { SizeDocument } from "./size.types";

/** Create Product ApiResponse */
export interface CreateProductApiResponse {
    success:boolean,
    statusCode:number,
    message:string,
    data:[]
}

export interface ProductApiImplmentsInterface {
  CreateProduct:(product:unknown) => Promise<CreateProductApiResponse>;
  SearchProducts?:(searchPayload: SearchProductsInterface) => Promise<SearchProductApiResponse>;
}

export type ProductSort =
  | "PRICE_HIGH_TO_LOW"
  | "PRICE_LOW_TO_HIGH"
  | "NEWEST_FIRST"
  | "RELEVANCE";

export interface FeaturedProductsSortingInterface {
  page: number;
  limit: number;
  categoryId?: string | null;
  price?: {
    min?: number;
    max?: number;
  };
  sizes?: string[] | null;
  sort?: ProductSort | null;

}

export interface ProductResponse {
  _id: string;
  title: string;
  coverImage: string;
  totalLikes: number;
  isLiked: boolean;
  price: number;
  parcelSize: string;
  condition: string;
  brand: string;

}

export interface FeaturedProductApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ProductResponse[];
}

/** Note: Product Document */
export interface ProductDocument {
    _id:string,
    categoryId:string,
    owner:string,
    title:string,
    description:string,
    condition:ProductCondition,
    brand:string,
    images:string[],
    coverImage:string,
    colors:string[],
    materials:string[],
    parcelSize:ProductParcelSize,
    sizes:string[],
    price:number,
    status:ProductStatus,
};

/** ---------------- ADDED FOR SEARCH ENDPOINT ---------------- */

export interface SearchProductsInterface {
  q?: string | null;
  categoryId?: string | null;
  price?: {
    min?: number | null;
    max?: number | null;
  };
  materials?: string[];
  conditions?: string[];
  colors?: string[] | null;
  brands?: string[] | null;
  sizes?: string[] | null;
  page?: number;
  sort?: ProductSort | null;
  limit?: number;
};

export interface SearchProductApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: SearchProductsInterface[];
};

/** Note: Onwer Product and Similar Products Interface */
export interface OwnerProductAndSimilarProductsInterface {
  _id:string,
  title:string,
  coverImage:string,
  price:number,
  brand:string,
  condition:ProductCondition,
  parcelSize:ProductParcelSize,
  isLiked:boolean,
  totalLikes:number
};

/** Note: Get Single Product Api Response Interface */
export interface GetSingleProductResponseInterface {
  _id:string,
  owner:{
    _id:string,
    fullname:string,
    avatar:string | null,
    username:string,
    country?:string | null,
    lastSeen:Date,
    city?:string | null
  },
  title:string,
  coverImage:string,
  sizes:SizeDocument[],
  description:string,
  condition:ProductCondition,
  brand:BrandDocument,
  colors:string[],
  price:string,
  parcelSize:ParcelSizeInterface,
  status:ProductStatus,
  ownerProducts:OwnerProductAndSimilarProductsInterface[],
  similarProducts:OwnerProductAndSimilarProductsInterface[],
  isFollowed:boolean,
  createdAt:Date,
  isLiked:boolean,
  totalLikes:number,
  categoryTree:{
    _id:string,
    title:string
  }[],
  images:string[]
};

/** Note: Get Single Product Api Response */
export interface GetSingleProductApiResponseInterface {
  success: boolean;
  statusCode: number;
  message: string;
  data: GetSingleProductResponseInterface;
};
