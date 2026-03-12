import type { CategoryDocument } from "../api/index";

/** Note: Mega Menu Props Interface */
export interface MegaMenuPropsInterface {
  category: CategoryDocument;
  onCategoryClick: (id: string) => void;
};

/** Note: Category Props Interface */
export interface CategoryPropsInterface {
  categories: CategoryDocument[];
  onCategoryClick: (id: string, parentName?: string) => void;
  variant?: "overlay" | "solid";
};
