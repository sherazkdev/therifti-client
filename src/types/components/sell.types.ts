import type { Dispatch, SetStateAction } from "react";
import type { CategoryDocument, MaterialDocument, SizeDocument, BrandDocument } from "../api/index";
import type { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

export type SelectedCategory = {
  path: string[];
};

/** Note: Form Value || formData */
export type SellFormValues = {
  title: string;
  price: number;
  description: string;
  parcelSize: string;
};

export const PRODUCT_CONDITION = ["NEW_WITH_TAGS","NEW_WITHOUT_TAGS","VERY_GOOD","GOOD","SATISFACTORY"] as const;
export type ProductCondition = typeof PRODUCT_CONDITION[number];

/** Note: Product Parcel size array */
export const PRODUCT_PARCEL_SIZE = [
  "SMALL",
  "MEDIUM",
  "LARGE"
] as const;
export type ProductParcelSize = typeof PRODUCT_PARCEL_SIZE[number];

/** @note: Parcel Size Interface */
export interface ParcelSizeInterface {
  parcelSize:ProductParcelSize,
  info:string
}

/** Note: Product Status array */
export const PRODUCT_STATUS = [
  "DRAFT",
  "PUBLISHED",
  "DELETED",
  "SOLD"
] as const;
export type ProductStatus = typeof PRODUCT_STATUS[number];

/** Note: Category Drop Down Props Interface */
export interface CategoryDropDownPropsInterface  {
  handleCategoryOnChange:(category:CategoryDocument) => void
};

/** Note: Listing image uploader — uploads to cloud immediately; parent reads URLs for submit */
export interface ListingImagesState {
  readyUrls: string[];
  uploading: boolean;
  hasErrorSlot: boolean;
}

/** Note: Image Uploader Props Interface */
export interface ImageUploaderPropsInterface {
  showPhotoTips: boolean;
  setShowPhotoTips: Dispatch<SetStateAction<boolean>>;
  onListingImagesStateChange: (state: ListingImagesState) => void;
}

/** Note: Item Attributes Props Interface */
export interface ItemAttributesPropsInterface {

  categoryId:string,

  Selectedmaterials: MaterialDocument[];
  Selectedbrand: BrandDocument | null;
  Selectedcondition: string | null;
  Selectedcolors: string[];
  Selectedsizes: SizeDocument[];

  handleColorOnChange: (colors:string[]) => void,
  handleBrandOnChange: (brand:BrandDocument) => void,
  handlConditionOnChange: (condition:string) => void,
  handlMaterialOnChange: (materials:MaterialDocument[]) => void,
  handlSizeOnChange: (sizes:SizeDocument[]) => void,

  materialError: string;
  brandError: string;
  conditionError: string;
  colorError: string;
  sizeError: string;
};

/** Note: Multi Select Drop Down Props Interface */
export interface MultiSelectDropDownPropsInterface {
  label: "Material" | "Size" | "Brand" | "Condition" | "Color";
  options: SizeDocument[] | MaterialDocument[] | BrandDocument[] | string[];
  selected: SizeDocument[] | MaterialDocument[] | BrandDocument | string[] | null | string;
  onChange: (v: any) => void;
  error?: string;
  singleSelect?: boolean;
  maxSelect?: number;
};

/** Note: Price Input Form Values. */
export interface PriceInputFormValues {
  title: string;
  price: number;
  description: string;
  parcelSize: string;
};

/** Note: Price Input Props Interface. */
export interface PriceInputPropsInterface  {
  register: UseFormRegister<PriceInputFormValues>;
  errors: FieldErrors<PriceInputFormValues>;
  setValue: UseFormSetValue<PriceInputFormValues>;
};