
/** Note: Category Document */
export interface CategoryDocument {
  _id: string,
  title: string,
  image: string,
  /** Lucide React export name, e.g. "Shirt" — see DynamicIcon */
  icon?: string | null,
  children?: CategoryDocument[]
};

export interface GetCategoriesApiResponse {
  statusCode:number,
  success:boolean,
  message:string,
  data:CategoryDocument[]
}