import type { BrandDocument } from "../../../../types/brand/brand.types";
import type { MaterialDocument } from "../../../../types/material/material.types";
import type { SizeDocument } from "../../../../types/size/size.types";

export interface ItemAttributesPropsInterface {

  categoryId:string,

  Selectedmaterials: MaterialDocument[] | null;
  Selectedbrand: BrandDocument | null;
  Selectedcondition: string | null;
  Selectedcolors: string[];
  Selectedsizes: SizeDocument[] | null;

  handleColorOnChange: (color:string) => void,
  handleBrandOnChange: (brand:BrandDocument) => void,
  handlConditionOnChange: (condition:string) => void,
  handlMaterialOnChange: (material:MaterialDocument) => void,
  handlSizeOnChange: (size:SizeDocument) => void,

  materialError: string;
  brandError: string;
  conditionError: string;
  colorError: string;
  sizeError: string;
}