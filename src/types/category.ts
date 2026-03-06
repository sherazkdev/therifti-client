export interface Category {
  _id: string;
  title: string;
  icon?: any;
  children?: Category[];
}