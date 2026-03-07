export interface CategoryDocument {
  _id: string,
  title: string,
  image: string,
  icon?: any,
  children?: CategoryDocument[]
}