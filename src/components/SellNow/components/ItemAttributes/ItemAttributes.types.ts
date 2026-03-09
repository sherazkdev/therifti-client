import type { BrandDocument } from "../../../../types/brand/brand.types";
import type { MaterialDocument } from "../../../../types/material/material.types";
import type { SizeDocument } from "../../../../types/size/size.types";

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
}