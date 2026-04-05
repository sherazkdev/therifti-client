import React, { useEffect, useMemo, useState } from "react";
import { Heart, ChevronLeft, ChevronRight, X } from "lucide-react";
import styles from "./ImageGallery.module.css";

interface Props {
  images: string[];
  likesCount?: number;
  isLiked?: boolean;
  onToggleLike?: () => void;
  isLoading?: boolean;
  coverImage: string;
}

function buildGalleryUrls(coverImage: string | undefined, images: string[] | undefined): string[] {
  const out: string[] = [];
  const add = (u: string | undefined) => {
    const s = typeof u === "string" ? u.trim() : "";
    if (s && !out.includes(s)) out.push(s);
  };
  add(coverImage);
  for (const u of images ?? []) add(u);
  return out;
}

const ImageGallery: React.FC<Props> = ({
  images,
  likesCount = 0,
  isLiked = false,
  onToggleLike,
  coverImage,
}) => {
  const galleryUrls = useMemo(
    () => buildGalleryUrls(coverImage, images),
    [coverImage, images]
  );

  const [mainImage, setMainImage] = useState<string>(() => galleryUrls[0] ?? "");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!galleryUrls.length) {
      setMainImage("");
      return;
    }
    setMainImage((prev) => (prev && galleryUrls.includes(prev) ? prev : galleryUrls[0]));
  }, [galleryUrls]);

  const openLightbox = () => {
    const idx = galleryUrls.indexOf(mainImage);
    setCurrentIndex(idx >= 0 ? idx : 0);
    setIsLightboxOpen(true);
  };

  const slidePrev = () => {
    if (!galleryUrls.length) return;
    setCurrentIndex((i) => (i === 0 ? galleryUrls.length - 1 : i - 1));
  };

  const slideNext = () => {
    if (!galleryUrls.length) return;
    setCurrentIndex((i) => (i === galleryUrls.length - 1 ? 0 : i + 1));
  };

  const safeIndex = galleryUrls.length ? currentIndex % galleryUrls.length : 0;
  const lightboxSrc = galleryUrls[safeIndex];

  if (!galleryUrls.length) {
    return (
      <div className={styles.container}>
        <div className={styles.mainImageWrapper}>
          <div className={styles.noImage}>No images</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.thumbnailList}>
          {galleryUrls.map((img, idx) => (
            <button
              key={`${img}-${idx}`}
              type="button"
              className={`${styles.thumbnailBtn} ${mainImage === img ? styles.active : ""}`}
              onClick={() => setMainImage(img)}
            >
              <img src={img} alt="" className={styles.thumbnailImg} />
            </button>
          ))}
        </div>

        <div className={styles.mainImageWrapper} onClick={openLightbox}>
          <img src={mainImage} alt="" className={styles.mainImage} />

          <button
            type="button"
            className={styles.likeBtn}
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike?.();
            }}
          >
            <Heart size={16} fill={isLiked ? "black" : "none"} color={isLiked ? "black" : "gray"} />
            <span>{likesCount}</span>
          </button>
        </div>
      </div>

      {isLightboxOpen && lightboxSrc && (
        <div className={styles.lightboxOverlay} onClick={() => setIsLightboxOpen(false)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button type="button" className={styles.closeBtn} onClick={() => setIsLightboxOpen(false)}>
              <X size={24} color="white" />
            </button>

            <button type="button" className={`${styles.navBtn} ${styles.left}`} onClick={slidePrev}>
              <ChevronLeft size={32} color="white" />
            </button>

            <img src={lightboxSrc} alt="" className={styles.lightboxImg} />

            <button type="button" className={`${styles.navBtn} ${styles.right}`} onClick={slideNext}>
              <ChevronRight size={32} color="white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
