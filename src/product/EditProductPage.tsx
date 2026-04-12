import { useNavigate } from "react-router-dom";

import PhotoTipsModal from "../components/SellNow/components/photoTipsModal/PhotoTipsModal";
import ImageUploader from "../components/SellNow/components/ImageUploader/ImageUploader";
import CategoryDropdown from "../components/SellNow/components/CategoryDropDown/CategoryDropDown";
import ItemAttributes from "../components/SellNow/components/ItemAttributes/ItemAttributes";
import PriceInput from "../components/SellNow/components/PriceInput/PriceInput";
import PromoFooter from "../components/Promofooter/PromoFooter";
import { ContentFallback } from "../components/ContentFallback/ContentFallback";

import styles from "../components/SellNow/SellItem.module.css";

import { useEditProduct } from "./hooks/useEditProduct";
import type { EditProductSubmitPayload } from "./editProduct.types";

export type EditProductPageProps = {
  /** Wire this to your update API. Defaults to `console.info` for integration testing. */
  handleEditSubmit?: (data: EditProductSubmitPayload) => void | Promise<void>;
};

const defaultHandleEditSubmit = async (data: EditProductSubmitPayload) => {
  console.info("[EditProductPage] handleEditSubmit payload", data);
};

const EditProductPage = ({ handleEditSubmit = defaultHandleEditSubmit }: EditProductPageProps) => {
  const navigate = useNavigate();
  const {
    product,
    isLoadingProduct,
    register,
    setValue,
    errors,
    listingImages,
    handleListingImagesStateChange,
    showPhotoTips,
    setShowPhotoTips,
    categoryId,
    initialCategoryPath,
    initialRemoteImages,
    initialRemoteImagesKey,
    defaultPrice,
    onExistingImageRemoved,
    handleCategoryChange,
    handleBrandChange,
    handleConditionChange,
    handleMaterialChange,
    handleSizeChange,
    handleColorChange,
    fieldErrors,
    submitWithStatus,
    parcelSizeOptions,
    selectedBrand,
    selectedColors,
    selectedCondition,
    selectedMaterials,
    selectedSizes,
    isSaving,
  } = useEditProduct({ handleEditSubmit });

  const busy = isLoadingProduct || isSaving;

  if (isLoadingProduct && !product) {
    return (
      <>
        <div className={styles.loaderMain}>
          <div className="mediumLoader"></div>
        </div>
        <PromoFooter />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <div className={styles.container}>
          <ContentFallback
            title="Product Not Found"
            description="The product you are looking for does not exist or has been removed."
            secondaryAction={{ label: "Go Back", onClick: () => navigate(-1) }}
            primaryAction={{ label: "Browse Products", to: "/catalog" }}
          />
        </div>
        <PromoFooter />
      </>
    );
  }

  return (
    <>
      {busy && (
        <div className={styles.loaderMain}>
          <div className="mediumLoader"></div>
        </div>
      )}

      <div className={styles.container}>
        <h2 className={styles.title}>Edit listing</h2>

        <ImageUploader
          key={initialRemoteImagesKey}
          showPhotoTips={showPhotoTips}
          setShowPhotoTips={setShowPhotoTips}
          onListingImagesStateChange={handleListingImagesStateChange}
          initialRemoteImages={initialRemoteImages}
          onExistingImageRemoved={onExistingImageRemoved}
        />
        {fieldErrors.images && (
          <div className={styles.imageErrorOutside}>{fieldErrors.images}</div>
        )}

        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.row}>
            <div className={styles.formGroup} style={{ flex: 1 }}>
              <label>Title</label>
              <input placeholder="Enter item title" {...register("title", { required: "Title is required" })} />
              {errors.title && <span className={styles.error}>{errors.title.message}</span>}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <CategoryDropdown
                handleCategoryOnChange={handleCategoryChange}
                initialCategoryPath={initialCategoryPath}
              />
              {fieldErrors.category && <span className={styles.error}>{fieldErrors.category}</span>}
            </div>
            <PriceInput register={register} errors={errors} setValue={setValue} defaultPrice={defaultPrice} />
          </div>

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

          <div className={styles.formGroup}>
            <label>Select your Parcel Size</label>
            <div className={styles.parcelList}>
              {parcelSizeOptions.map((size, index) => (
                <label key={index} className={styles.parcelRow}>
                  <div className="row">
                    <span>{size.parcelSize}</span>
                    <p>{size.info}</p>
                  </div>
                  <input
                    type="radio"
                    value={size.parcelSize}
                    {...register("parcelSize", { required: "Parcel size is required" })}
                  />
                </label>
              ))}
            </div>
            {errors.parcelSize && <span className={styles.error}>{errors.parcelSize.message}</span>}
          </div>

          <div className={styles.actions}>
            <button
              disabled={busy || listingImages.uploading}
              type="button"
              className={styles.draftBtn}
              onClick={() => submitWithStatus("DRAFT")}
            >
              Save Draft
            </button>
            <button
              disabled={busy || listingImages.uploading}
              type="button"
              className={styles.submitBtn}
              onClick={() => submitWithStatus("PUBLISHED")}
            >
              Update
            </button>
          </div>
        </form>

        {showPhotoTips && <PhotoTipsModal onClose={() => setShowPhotoTips(false)} />}
      </div>

      <PromoFooter />
    </>
  );
};

export default EditProductPage;
