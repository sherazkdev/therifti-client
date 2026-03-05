import type { Category } from "../../../types/category";

export interface MegaMenuPropsInterface {
  category: Category;
  onCategoryClick: (id: string) => void;
};
