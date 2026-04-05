
/** Note: Category Document */
export interface CategoryDocument {
  _id: string,
  title: string,
  image: string,
  icon?: any,
  children?: CategoryDocument[]
};

export interface GetCategoriesApiResponse {
  statusCode:number,
  success:boolean,
  message:string,
  data:CategoryDocument[]
}