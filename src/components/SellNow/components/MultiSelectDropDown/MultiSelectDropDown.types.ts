import type { BrandDocument } from "../../../../types/brand/brand.types";
import type { MaterialDocument } from "../../../../types/material/material.types";
import type { SizeDocument } from "../../../../types/size/size.types";

export interface MultiSelectDropDownProps {
  label: "Material" | "Size" | "Brand" | "Condition" | "Color";
  options: SizeDocument[] | MaterialDocument[] | BrandDocument[] | string[];
  selected: SizeDocument[] | MaterialDocument[] | BrandDocument | string[] | null | string;
  onChange: (v: any) => void;
  error?: string;
  singleSelect?: boolean;
  maxSelect?: number;
};  