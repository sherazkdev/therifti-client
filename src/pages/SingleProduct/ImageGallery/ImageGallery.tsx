import React, { useState, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight, X } from 'lucide-react';
import styles from './ImageGallery.module.css';

interface Props {
  images: string[];
  likesCount?: number;
  isLiked?: boolean;
  onToggleLike?: () => void;
  isLoading?: boolean;
}

const ImageGallery: React.FC<Props> = ({ images, likesCount = 0, isLiked = false, onToggleLike, isLoading }) => {
  const [mainImage, setMainImage] = useState<string>('');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images && images.length > 0) {
      setMainImage(images[0]);
    }
  }, [images]);

  // --- THE LAYOUT-HOLDING SKELETON ---
  if (isLoading) {
    return (
      <div className={styles.container}>
        {/* Fake Thumbnails */}
        <div className={styles.thumbnailListSkeleton}>
          <div className={`${styles.skeletonPulse} ${styles.skeletonThumb}`} />
          <div className={`${styles.skeletonPulse} ${styles.skeletonThumb}`} />
          <div className={`${styles.skeletonPulse} ${styles.skeletonThumb}`} />
        </div>
        
        {/* Fake Main Image (Holds the 3/4 aspect ratio!) */}
        <div className={`${styles.mainImageSkeleton} ${styles.skeletonPulse}`} />
      </div>
    );
  }

  // --- THE REAL CONTENT ---
  return (
    <>
      <div className={styles.container}>
        {/* Left: Thumbnails */}
        <div className={styles.thumbnailList}>
          {images.map((img, idx) => (
            <button
              key={idx}
              className={`${styles.thumbnailBtn} ${mainImage === img ? styles.active : ''}`}
              onClick={() => setMainImage(img)}
            >
              <img src={img} alt={`Thumbnail ${idx}`} className={styles.thumbnailImg} />
            </button>
          ))}
        </div>

        {/* Right: Main Image */}
        <div className={styles.mainImageWrapper} onClick={() => {
          setCurrentIndex(images.indexOf(mainImage));
          setIsLightboxOpen(true);
        }}>
          <img src={mainImage} alt="Main Product" className={styles.mainImage} />
          
          {/* Floating Like Button */}
          <button 
            className={styles.likeBtn} 
            onClick={(e) => {
              e.stopPropagation(); // Prevents opening the lightbox when clicking "Like"
              if (onToggleLike) onToggleLike();
            }}
          >
            <Heart size={16} fill={isLiked ? "black" : "none"} color={isLiked ? "black" : "gray"} />
            <span>{likesCount}</span>
          </button>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className={styles.lightboxOverlay} onClick={() => setIsLightboxOpen(false)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setIsLightboxOpen(false)}>
              <X size={24} color="white" />
            </button>
            
            <button className={`${styles.navBtn} ${styles.left}`} onClick={() => setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)}>
              <ChevronLeft size={32} color="white" />
            </button>

            <img src={images[currentIndex]} alt={`Gallery ${currentIndex}`} className={styles.lightboxImg} />

            <button className={`${styles.navBtn} ${styles.right}`} onClick={() => setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)}>
              <ChevronRight size={32} color="white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;