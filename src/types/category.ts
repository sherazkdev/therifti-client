export type Category = {
  id: string;
  name: string;
  title: string;   
  children?: Category[];
  icon?: any;
};