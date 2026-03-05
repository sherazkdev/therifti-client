import type { Category } from "../../../types/category";

export interface CategoryPropsInterface {
  categories: Category[];
  onCategoryClick: (id: string, parentName?: string) => void;
  variant?: "overlay" | "solid";
};
