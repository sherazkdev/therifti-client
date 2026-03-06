export type CategoryNode = {
  id: string;
  label: string;
  icon?: string;
  children?: CategoryNode[];
};

export type SelectedCategory = {
  path: string[];
};