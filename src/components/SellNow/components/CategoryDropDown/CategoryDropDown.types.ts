import type { CategoryDocument } from "../../../../types/category/category.types";

export type SelectedCategory = {
  path: string[];
};

export interface CategoryDropDownProps  {
  handleCategoryOnChange:(category:CategoryDocument) => void
};