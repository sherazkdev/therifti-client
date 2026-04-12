import { useEffect, useMemo, useRef, useState, type FC } from "react";
import { UploadCloud, Plus, X, RotateCw, Camera } from "lucide-react";
import type { ImageUploaderPropsInterface } from "../../../../types/components/index";

/** Component Styles */
import styles from "./ImageUploader.module.css";
import { useSellListingImages } from "../../hooks/useSellListingImages";

const MAX_IMAGES = 4;
const MAX_FILE_SIZE = 9 * 1024 * 1024;

const ImageUploader: FC<ImageUploaderPropsInterface> = ({
  setShowPhotoTips,
  onListingImagesStateChange,
  initialRemoteImages,
  onExistingImageRemoved,
}) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);

  const { slots, imageError, setImageError, addFiles, removeAt, setMain, rotateAt, anyUploading } =
    useSellListingImages({
      maxImages: MAX_IMAGES,
      maxFileSizeBytes: MAX_FILE_SIZE,
      initialRemoteImages,
      onExistingImageRemoved,
    });

  const readyUrls = useMemo(
    () => slots.filter((s) => s.state === "ready" && s.secureUrl && s.publicId).map((s) => {
      return {
        secureUrl: s.secureUrl as string,
        publicId: s.publicId as string
      }
    }),
    [slots]
  );
  const hasErrorSlot = useMemo(() => slots.some((s) => s.state === "error"), [slots]);

  const stateCallbackRef = useRef(onListingImagesStateChange);
  stateCallbackRef.current = onListingImagesStateChange;

  useEffect(() => {
    stateCallbackRef.current?.({
      readyUrls,
      uploading: anyUploading,
      hasErrorSlot,
    });
  }, [readyUrls, anyUploading, hasErrorSlot]);

  const isFileDrag = (e: React.DragEvent) => {
    return Array.from(e.dataTransfer.types || []).includes("Files");
  };

  const resetFileInput = () => {
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleFiles = (files: FileList) => {
    addFiles(files);
    resetFileInput();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    handleFiles(e.target.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!isFileDrag(e)) return;
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!isFileDrag(e)) return;
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (!isFileDrag(e)) return;
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleBrowseClick = () => {
    fileRef.current?.click();
  };

  return (
    <>
      <div
        className={styles.uploadWrapper}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!slots.length ? (
          <div
            className={`${styles.uploadBox} ${dragging ? styles.dragging : ""}`}
            onClick={handleBrowseClick}
          >
            <UploadCloud />

            <p>Drag & drop or browse</p>

            <p style={{ fontSize: 12, opacity: 0.8, marginTop: 6 }}>
              Max {MAX_IMAGES} images • Max 9MB each
            </p>

            {imageError && <span className={styles.error}>{imageError}</span>}

            <input
              ref={fileRef}
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <>
            <div className={styles.imageList}>
              {slots.map((slot, index) => (
                <div key={slot.id} className={styles.imageItem}>
                  <img
                    src={slot.localPreviewUrl}
                    alt=""
                    draggable={false}
                    style={{
                      transform: `rotate(${slot.rotation}deg)`,
                      transition: "transform 180ms ease",
                    }}
                  />

                  {slot.state === "uploading" && (
                    <div className={styles.uploadingOverlay}>
                      <div className="mediumLoader" />
                    </div>
                  )}

                  {slot.state === "error" && slot.errorMessage && (
                    <div className={styles.slotError}>{slot.errorMessage}</div>
                  )}

                  {index !== 0 && slot.state === "ready" && (
                    <button
                      type="button"
                      className={styles.setMainBtn}
                      onClick={() => setMain(index)}
                    >
                      Set Main
                    </button>
                  )}

                  {slot.state === "ready" && (
                    <button
                      type="button"
                      title="Rotate"
                      className={styles.rotateBtn}
                      onClick={() => rotateAt(index)}
                    >
                      <RotateCw size={18} />
                    </button>
                  )}

                  {index === 0 && slot.state === "ready" && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 6,
                        left: 6,
                        background: "#000",
                        color: "#fff",
                        fontSize: 12,
                        padding: "2px 6px",
                        borderRadius: 4,
                      }}
                    >
                      Main
                    </span>
                  )}

                  <X
                    className={styles.removeIcon}
                    onClick={() => {
                      removeAt(index);
                      setImageError("");
                    }}
                  />
                </div>
              ))}

              {slots.length < MAX_IMAGES && (
                <div className={styles.addImage} onClick={handleBrowseClick}>
                  <Plus />

                  <input
                    ref={fileRef}
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {imageError && (
        <div className={styles.imageErrorOutside}>{imageError}</div>
      )}

      <div className={styles.photoTip}>
        <Camera size={18} />
        <p>
          Catch Your Buyers’ Eye — Use Quality Photos{" "}
          <span
            className={styles.learnMore}
            onClick={() => setShowPhotoTips(true)}
          >
            Learn More
          </span>
        </p>
      </div>
    </>
  );
};

export default ImageUploader;
