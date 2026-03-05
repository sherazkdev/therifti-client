export interface Category {
  _id: string;
  title: string;
  icon?: any;  // only for second level
  children?: Category[];
}