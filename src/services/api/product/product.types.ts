/** Create Product ApiResponse */
export interface CreateProductApiResponse {
    success:boolean,
    statusCode:number,
    message:string,
    data:[]
}

export interface ProductApiImplmentsInterface {
    CreateProduct:(product:unknown) => Promise<CreateProductApiResponse>;
    SearchProducts?:(searchPayload: SearchProductsPayloadInterface) => Promise<SearchProductApiResponse>;
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

export interface ProductCardResponse {
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
  data: ProductCardResponse[];
}

/** ---------------- ADDED FOR SEARCH ENDPOINT ---------------- */

export interface SearchProductsPayloadInterface {
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
}

export interface SearchProductApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ProductCardResponse[]; // Reusing the same response shape!
}