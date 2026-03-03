export interface Category {
  id: string;
  name: string;
  icon?: any;  // only for second level
  children?: Category[];
}