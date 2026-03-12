import { useEffect, useState, type FC } from "react";
import MultiSelectDropdown from "../MultiSelectDropDown/MultiSelectDropDown";
import styles from "../../SellItem.module.css";
import type { ItemAttributesPropsInterface } from "../../../../types/components/index";

/** Hook */
import useCategoryAttributes from "../../../../hooks/server/category/useCategoryAttributes";
import type { BrandDocument, MaterialDocument, SizeDocument } from "../../../../types/api/index";

const ItemAttributes:  FC<ItemAttributesPropsInterface> = ({
  categoryId,

  Selectedbrand,
  Selectedcolors,
  Selectedcondition,
  Selectedmaterials,
  Selectedsizes,

  handleColorOnChange,
  handleBrandOnChange,
  handlConditionOnChange,
  handlMaterialOnChange,
  handlSizeOnChange,

  materialError,
  brandError,
  conditionError,
  colorError,
  sizeError,
}) => {

  /** Variables For multi select*/
  const [brandsDocuments,setBrandsDocuments] = useState<BrandDocument[] | []>([]);
  const [materialsDocuments,setMaterialDocuments] = useState<MaterialDocument[] | []>([]);
  const [sizesDocuments,setSizesDocuments] = useState<SizeDocument[] | []>([]);
  const [colorsList,setColorsList] = useState<string[]>([
    "BLACK",
    "WHITE",
    "GREY",
    "BROWN",
    "BEIGE",

    "RED",
    "MAROON",
    "PINK",
    "PURPLE",
    "ORANGE",
    "YELLOW",

    "BLUE",
    "NAVY",
    "TEAL",
    "GREEN",
    "OLIVE",

    "GOLD",
    "SILVER"
  ]);
  const [conditionsList,setConditionsList] = useState<string[]>(["NEW_WITH_TAGS","NEW_WITHOUT_TAGS","VERY_GOOD","GOOD","SATISFACTORY"])

  const {brands,isLoading,materials,sizes} = useCategoryAttributes(categoryId);

  useEffect( () => {
    if((brands as BrandDocument[]).length > 0) setBrandsDocuments(brands as BrandDocument[]);
    if((materials as MaterialDocument[]).length > 0) setMaterialDocuments(materials);
    if((sizes as SizeDocument[]).length > 0) setSizesDocuments(sizes as SizeDocument[]);
    console.log(isLoading,materials,sizes)
  }, [isLoading,materials,sizes]);

  return (
    <>
      {isLoading ? <div className="loader"></div> : (
        <>
          <div className={styles.row}>
            <MultiSelectDropdown
              label="Material"
              options={materialsDocuments}
              selected={Selectedmaterials}
              onChange={handlMaterialOnChange}
              error={materialError}
              singleSelect={false}
              maxSelect={3}
            />

            <MultiSelectDropdown
              label="Brand"
              options={brandsDocuments}
              selected={Selectedbrand}
              onChange={handleBrandOnChange}
              error={brandError}
              singleSelect={true}
            />
          </div>

          <div className={styles.row}>
            <MultiSelectDropdown
              label="Condition"
              options={conditionsList}
              selected={Selectedcondition}
              onChange={handlConditionOnChange}
              error={conditionError}
              singleSelect={true}
            />

            <MultiSelectDropdown
              label="Color"
              options={colorsList}
              selected={Selectedcolors}
              onChange={handleColorOnChange}
              error={colorError}
              maxSelect={2}
              singleSelect={false}
            />
          </div>

          <div className={styles.row}>
            <MultiSelectDropdown
              label="Size"
              options={sizesDocuments}
              selected={Selectedsizes}
              onChange={handlSizeOnChange}
              error={sizeError}
              singleSelect={false}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ItemAttributes;