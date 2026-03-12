import { useState, useRef, type FC, useEffect } from "react";
import { UploadCloud, Plus, X, RotateCw, Camera } from "lucide-react";
import type { ImageUploaderPropsInterface } from "../../../../types/components/index";

/** Component Styles */
import styles from "./ImageUploader.module.css";

const ImageUploader: FC<ImageUploaderPropsInterface> = ({ setImages, images, setShowPhotoTips }) => {

  const fileRef = useRef<HTMLInputElement | null>(null);

  const [previews, setPreviews] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [imageError, setImageError] = useState("");
  const [rotations, setRotations] = useState<number[]>([]);

  /** Constants */
  const MAX_IMAGES = 4;
  const MAX_FILE_SIZE = 9 * 1024 * 1024;

  const fileKey = (f: File) => `${f.name}-${f.size}-${f.lastModified}`;

  const isFileDrag = (e: React.DragEvent) => {
    return Array.from(e.dataTransfer.types || []).includes("Files");
  };

  const resetFileInput = () => {
    if (fileRef.current) fileRef.current.value = "";
  };

  const generatePreviews = (files: File[]) => {
    setPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const generateRotations = (files: File[]) => {
    setRotations((prev) => [...prev, ...files.map(() => 0)]);
  };

  const validateFiles = (files: FileList) => {

    const fileArray = Array.from(files);

    const imageFiles = fileArray.filter((f) => f.type.startsWith("image/"));
    const nonImageCount = fileArray.length - imageFiles.length;

    const oversizedImages = imageFiles.filter((f) => f.size > MAX_FILE_SIZE);
    const validImages = imageFiles.filter((f) => f.size <= MAX_FILE_SIZE);

    return {
      nonImageCount,
      oversizedImages,
      validImages,
    };
  };

  const getUniqueImages = (files: File[]) => {
    const existingKeys = new Set(images.map(fileKey));
    return files.filter((f) => !existingKeys.has(fileKey(f)));
  };

  const handleFiles = (files: FileList) => {

    setImageError("");

    const { nonImageCount, oversizedImages, validImages } = validateFiles(files);

    const uniqueImages = getUniqueImages(validImages);

    const remainingSlots = MAX_IMAGES - images.length;

    if (remainingSlots <= 0) {
      setImageError(`You can upload up to ${MAX_IMAGES} images only.`);
      resetFileInput();
      return;
    }

    const imagesToAdd = uniqueImages.slice(0, remainingSlots);

    if (nonImageCount > 0) {
      setImageError("Some files were ignored because they are not images.");
    } else if (oversizedImages.length > 0) {
      setImageError("One or more images are larger than 9MB and were rejected.");
    } else if (uniqueImages.length > remainingSlots) {
      setImageError(`Only ${remainingSlots} more image(s) can be added (max ${MAX_IMAGES}).`);
    } else if (imagesToAdd.length === 0 && validImages.length > 0) {
      setImageError("These images were already added (duplicates).");
    }

    if (imagesToAdd.length) {

      setImages((prev) => [...prev, ...imagesToAdd]);

      generatePreviews(imagesToAdd);
      generateRotations(imagesToAdd);
    }

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

  const handleRemoveImage = (index: number) => {

    URL.revokeObjectURL(previews[index]);

    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setRotations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSetMain = (index: number) => {

    if (index === 0) return;

    const imagesCopy = [...images];
    const previewsCopy = [...previews];
    const rotationsCopy = [...rotations];

    const [img] = imagesCopy.splice(index, 1);
    const [prev] = previewsCopy.splice(index, 1);
    const [rot] = rotationsCopy.splice(index, 1);

    imagesCopy.unshift(img);
    previewsCopy.unshift(prev);
    rotationsCopy.unshift(rot);

    setImages(imagesCopy);
    setPreviews(previewsCopy);
    setRotations(rotationsCopy);
  };

  const handleRotateImage = (index: number) => {
    setRotations((prev) =>
      prev.map((deg, i) => (i === index ? (deg + 90) % 360 : deg))
    );
  };

  const handleBrowseClick = () => {
    fileRef.current?.click();
  };

  /** Cleanup Object URLs */
  useEffect(() => {
    return () => previews.forEach((p) => URL.revokeObjectURL(p));
  }, [previews]);

  return (
    <>
      <div
        className={styles.uploadWrapper}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!images.length ? (
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
              {previews.map((src, index) => (
                <div key={src} className={styles.imageItem}>

                  <img
                    src={src}
                    draggable={false}
                    style={{
                      transform: `rotate(${rotations[index] || 0}deg)`,
                      transition: "transform 180ms ease",
                    }}
                  />

                  {index !== 0 && (
                    <button
                      type="button"
                      className={styles.setMainBtn}
                      onClick={() => handleSetMain(index)}
                    >
                      Set Main
                    </button>
                  )}

                  <button
                    type="button"
                    title="Rotate"
                    className={styles.rotateBtn}
                    onClick={() => handleRotateImage(index)}
                  >
                    <RotateCw size={18} />
                  </button>

                  {index === 0 && (
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
                    onClick={() => handleRemoveImage(index)}
                  />
                </div>
              ))}

              {images.length < MAX_IMAGES && (
                <div
                  className={styles.addImage}
                  onClick={handleBrowseClick}
                >
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