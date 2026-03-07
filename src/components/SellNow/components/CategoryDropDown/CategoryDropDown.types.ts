
export type SelectedCategory = {
  path: string[];
};

export interface CategoryDropDownProps  {
  onSelectCategory: (cat: SelectedCategory) => void;
};