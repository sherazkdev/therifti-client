import { useState } from "react";
import { useForm } from "react-hook-form";

import styles from "./SellItem.module.css";

/* Components */
import PhotoTipsModal from "./components/photoTipsModal/PhotoTipsModal";
import ImageUploader from "./components/ImageUploader/ImageUploader";
import CategoryDropdown from "./components/CategoryDropDown/CategoryDropDown";
import ItemAttributes from "./components/ItemAttributes/ItemAttributes";
import PriceInput from "./components/PriceInput/PriceInput";

/* Types */
import type { FormValues, ListingStatus } from "./SellItem.types";
import type { CategoryDocument } from "../../types/category/category.types";
import type { MaterialDocument } from "../../types/material/material.types";
import type { SizeDocument } from "../../types/size/size.types";
import type { BrandDocument } from "../../types/brand/brand.types";

const SellItem = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  /* ---------- IMAGE STATE ---------- */

  const [images, setImages] = useState<File[]>([]);
  const [showPhotoTips, setShowPhotoTips] = useState(false);

  /* ---------- CATEGORY ---------- */

  const [categoryId, setCategoryId] = useState<string | null>(null);

  /* ---------- ATTRIBUTES ---------- */

  const [selectedBrand, setSelectedBrand] = useState<BrandDocument | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<MaterialDocument[] | []>([]);
  const [selectedSizes, setSelectedSizes] = useState<SizeDocument[]>([]);

  /* ---------- ERRORS ---------- */

  const [imageError, setImageError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [brandError, setBrandError] = useState("");
  const [conditionError, setConditionError] = useState("");
  const [colorError, setColorError] = useState("");
  const [sizeError, setSizeError] = useState("");
  const [materialError, setMaterialError] = useState("");

  /* ---------- HANDLERS ---------- */

  const handleCategoryChange = (category: CategoryDocument) => {
    setCategoryId(category._id);
  };

  const handleMaterialChange = (material: any) => {
    setSelectedMaterials((prev) => [...prev, material]);
  };

  const handleSizeChange = (size: SizeDocument) => {
    setSelectedSizes((prev) => [...prev, size]);
  };

  const handleConditionChange = (condition: string) => {
    setSelectedCondition(condition);
  };

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) => [...prev, color]);
  };

  const handleBrandChange = (brand: BrandDocument) => {
    setSelectedBrand(brand);
  };

  /* ---------- FORM SUBMIT ---------- */

  const onSubmit = (data: FormValues, status: ListingStatus) => {
    let hasError = false;

    if (!images.length) {
      setImageError("At least 1 image is required (max 4).");
      hasError = true;
    }

    if (!categoryId) {
      setCategoryError("Category is required");
      hasError = true;
    }

    if (categoryId) {
      if (!selectedBrand) {
        setBrandError("Brand is required");
        hasError = true;
      }

      if (!selectedSizes.length) {
        setSizeError("Size is required");
        hasError = true;
      }

      if (!selectedMaterials.length) {
        setMaterialError("Material is required");
        hasError = true;
      }

      if (!selectedCondition) {
        setConditionError("Condition is required");
        hasError = true;
      }

      if (!selectedColors.length) {
        setColorError("Color is required");
        hasError = true;
      }
    }

    if (hasError) return;

    
  };

  const submitWithStatus = (status: ListingStatus) =>
    handleSubmit((data) => onSubmit(data, status))();

  /* ---------- UI ---------- */

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sell an Item</h2>

      {/* Image Upload */}
      <ImageUploader
        images={images}
        setImages={setImages}
        showPhotoTips={showPhotoTips}
        setShowPhotoTips={setShowPhotoTips}
      />

      {imageError && <div className={styles.imageErrorOutside}>{imageError}</div>}

      <form onSubmit={(e) => e.preventDefault()}>
        {/* TITLE */}
        <div className={styles.row}>
          <div className={styles.formGroup} style={{ flex: 1 }}>
            <label>Title</label>
            <input
              placeholder="Enter item title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <span className={styles.error}>{errors.title.message}</span>}
          </div>
        </div>

        {/* CATEGORY + PRICE */}
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <CategoryDropdown handleCategoryOnChange={handleCategoryChange} />
            {categoryError && <span className={styles.error}>{categoryError}</span>}
          </div>

          <PriceInput register={register} errors={errors} setValue={setValue} />
        </div>

        {/* ATTRIBUTES */}
        {categoryId && (
          <ItemAttributes
            Selectedbrand={selectedBrand}
            Selectedcolors={selectedColors}
            Selectedcondition={selectedCondition}
            Selectedmaterials={selectedMaterials}
            Selectedsizes={selectedSizes}
            categoryId={categoryId}
            handlConditionOnChange={handleConditionChange}
            handlSizeOnChange={handleSizeChange}
            handlMaterialOnChange={handleMaterialChange}
            handleBrandOnChange={handleBrandChange}
            handleColorOnChange={handleColorChange}
            brandError={brandError}
            colorError={colorError}
            conditionError={conditionError}
            materialError={materialError}
            sizeError={sizeError}
          />
        )}

        {/* DESCRIPTION */}
        <div className={styles.formGroup}>
          <label>Description</label>

          <textarea
            rows={5}
            placeholder="Describe your item in detail..."
            {...register("description", { required: "Description is required" })}
            className={styles.textarea}
          />

          {errors.description && (
            <span className={styles.error}>{errors.description.message}</span>
          )}
        </div>

        {/* PARCEL SIZE */}
        <div className={styles.formGroup}>
          <label>Select your Parcel Size</label>

          <div className={styles.parcelList}>
            {["5kg", "10kg", "15kg"].map((size) => (
              <label key={size} className={styles.parcelRow}>
                <span>{size}</span>
                <input
                  type="radio"
                  value={size}
                  {...register("parcelSize", { required: "Parcel size is required" })}
                />
              </label>
            ))}
          </div>

          {errors.parcelSize && (
            <span className={styles.error}>{errors.parcelSize.message}</span>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.draftBtn}
            onClick={() => submitWithStatus("DRAFT")}
          >
            Save Draft
          </button>

          <button
            type="button"
            className={styles.submitBtn}
            onClick={() => submitWithStatus("PUBLISHED")}
          >
            Upload
          </button>
        </div>
      </form>

      {showPhotoTips && <PhotoTipsModal onClose={() => setShowPhotoTips(false)} />}
    </div>
  );
};

export default SellItem;