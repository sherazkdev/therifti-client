import type { CategoryDocument } from "../api";

export type Drop = "category" | "price" | "size" | "sort" | null;

/** Note: Top Picks Filter Props Interface */
export interface TopPicksFiltersPropsInterface {
  open: Drop;
  toggleOpen: (d: Drop) => void;
  selectedPath: string;
  setSelectedPath: (val: string) => void;
  categoryTree: CategoryDocument[];
  catStack: string[];
  setCatStack: (stack: string[]) => void;
  currentCatNode: CategoryDocument | null;
  goIntoCategory: (key: string) => void;
  goBackCategory: () => void;
  applyCategorySelection: (explicitId?: string) => void;
  selectedSizes: string[];
  toggleSize: (size: string) => void;
  SIZE_OPTIONS: string[];
  sortValue: string;
  setSortValue: (val: string) => void;
  SORT_OPTIONS: string[];
  priceFrom: string;
  setPriceFrom: (val: string) => void;
  priceTo: string;
  setPriceTo: (val: string) => void;
  applyNonCategoryFilters: () => void;
  selectedCatOptions: Record<string, string[]>;
  toggleOption: (groupKey: string, option: string) => void;
  loadingCats: boolean;
  categoryId: string | null;
};