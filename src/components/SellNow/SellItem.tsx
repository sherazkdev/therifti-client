import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import styles from "./SellItem.module.css";

/* Components */
import PhotoTipsModal from "./components/photoTipsModal/PhotoTipsModal";
import ImageUploader from "./components/ImageUploader/ImageUploader";
import CategoryDropdown from "./components/CategoryDropDown/CategoryDropDown";
import ItemAttributes from "./components/ItemAttributes/ItemAttributes";
import PriceInput from "./components/PriceInput/PriceInput";

/* Types */
import type {
  SellFormValues,
  ProductStatus,
  ParcelSizeInterface,
  ListingImagesState,
} from "../../types/components/index";
import type { CategoryDocument, SizeDocument, MaterialDocument, BrandDocument  } from "../../types/api/index";

/* Hooks */
import useCreateProduct from "../../hooks/server/product/useCreateProduct";

/**
 * SellItem Component
 * @description Form to create a new product listing with images, attributes and price
 */
const SellItem = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<SellFormValues>();

  const productMutation = useCreateProduct();

  // ==========================
  // ======= STATE ============
  // ==========================

  // Images (uploaded to cloud immediately via ImageUploader)
  const [listingImages, setListingImages] = useState<ListingImagesState>({
    readyUrls: [],
    uploading: false,
    hasErrorSlot: false,
  });
  const [showPhotoTips, setShowPhotoTips] = useState(false);

  const handleListingImagesStateChange = useCallback((state: ListingImagesState) => {
    setListingImages((prev) => {
      if (
        prev.uploading === state.uploading &&
        prev.hasErrorSlot === state.hasErrorSlot &&
        prev.readyUrls.length === state.readyUrls.length &&
        prev.readyUrls.every((u, i) => u === state.readyUrls[i])
      ) {
        return prev;
      }
      return state;
    });
  }, []);

  // Category / Brand / Attributes
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<BrandDocument | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<MaterialDocument[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<SizeDocument[]>([]);
  const [parcelSize] = useState<ParcelSizeInterface[]>([
    { info: "For items that’d fit in a large envelope.", parcelSize: "SMALL" },
    { info: "For items that’d fit in a shoebox.", parcelSize: "MEDIUM" },
    { info: "For items that’d fit in a moving box.", parcelSize: "LARGE" },
  ]);

  // Errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // ==========================
  // ======= HANDLERS =========
  // ==========================

  const handleCategoryChange = (category: CategoryDocument) => setCategoryId(category._id);
  const handleBrandChange = (brand: BrandDocument) => setSelectedBrand(brand);
  const handleConditionChange = (condition: string) => setSelectedCondition(condition);
  const handleMaterialChange = (materials: MaterialDocument[]) => setSelectedMaterials(materials);
  const handleSizeChange = (sizes: SizeDocument[]) => setSelectedSizes(sizes);
  const handleColorChange = (colors: string[]) => setSelectedColors(colors);

  /**
   * Form submit handler
   * @param data - Form data from react-hook-form
   * @param status - Product status (DRAFT / PUBLISHED)
   */
  const onSubmit = async (data: SellFormValues, status: ProductStatus) => {
    const errors: Record<string, string> = {};

    if (listingImages.uploading) {
      errors.images = "Please wait for your images to finish uploading.";
    } else if (listingImages.hasErrorSlot) {
      errors.images = "Remove images that failed to upload before continuing.";
    } else if (!listingImages.readyUrls.length) {
      errors.images = "At least 1 image is required (max 4).";
    }
    if (!categoryId) errors.category = "Category is required";
    if (!selectedBrand) errors.brand = "Brand is required";
    if (!selectedSizes.length) errors.sizes = "Size is required";
    if (!selectedMaterials.length) errors.materials = "Material is required";
    if (!selectedCondition) errors.condition = "Condition is required";
    if (!selectedColors.length) errors.colors = "Color is required";


    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }
    const payload = {
      ...data,
      categoryId,
      brand: selectedBrand?._id,
      materials: selectedMaterials.map(m => m._id),
      sizes: selectedSizes.map(s => s._id),
      colors: selectedColors,
      condition: selectedCondition,
      status,
    };
    productMutation.mutate(
      { imageUrls: listingImages.readyUrls, product: payload },
      {
        onSuccess: (res) => {
          if (res?.success) {
            navigate("/");
          }
        },
      }
    );
  };

  const submitWithStatus = (status: ProductStatus) =>
    handleSubmit((data) => onSubmit(data, status))();

  // ==========================
  // ======= JSX ==============
  // ==========================

  return (
    <>
      {productMutation.isPending && (
        <div className={styles.loaderMain}>
          <div className="mediumLoader"></div>
        </div>
      )}

      <div className={styles.container}>
        <h2 className={styles.title}>Sell an Item</h2>

        {/* IMAGE UPLOADER */}
        <ImageUploader
          showPhotoTips={showPhotoTips}
          setShowPhotoTips={setShowPhotoTips}
          onListingImagesStateChange={handleListingImagesStateChange}
        />
        {fieldErrors.images && <div className={styles.imageErrorOutside}>{fieldErrors.images}</div>}

        <form onSubmit={(e) => e.preventDefault()}>
          {/* TITLE */}
          <div className={styles.row}>
            <div className={styles.formGroup} style={{ flex: 1 }}>
              <label>Title</label>
              <input placeholder="Enter item title" {...register("title", { required: "Title is required" })} />
              {errors.title && <span className={styles.error}>{errors.title.message}</span>}
            </div>
          </div>

          {/* CATEGORY + PRICE */}
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <CategoryDropdown handleCategoryOnChange={handleCategoryChange} />
              {fieldErrors.category && <span className={styles.error}>{fieldErrors.category}</span>}
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
              brandError={fieldErrors.brand}
              colorError={fieldErrors.colors}
              conditionError={fieldErrors.condition}
              materialError={fieldErrors.materials}
              sizeError={fieldErrors.sizes}
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
            {errors.description && <span className={styles.error}>{errors.description.message}</span>}
          </div>

          {/* PARCEL SIZE */}
          <div className={styles.formGroup}>
            <label>Select your Parcel Size</label>
            <div className={styles.parcelList}>
              {parcelSize.map((size, index) => (
                <label key={index} className={styles.parcelRow}>
                  <div className="row">
                    <span>{size.parcelSize}</span>
                    <p>{size.info}</p>
                  </div>
                  <input type="radio" value={size.parcelSize} {...register("parcelSize", { required: "Parcel size is required" })} />
                </label>
              ))}
            </div>
            {errors.parcelSize && <span className={styles.error}>{errors.parcelSize.message}</span>}
          </div>

          {/* ACTION BUTTONS */}
          <div className={styles.actions}>
            <button
              disabled={productMutation.isPending || listingImages.uploading}
              type="button"
              className={styles.draftBtn}
              onClick={() => submitWithStatus("DRAFT")}
            >
              Save Draft
            </button>
            <button
              disabled={productMutation.isPending || listingImages.uploading}
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
    </>
  );
};

export default SellItem;