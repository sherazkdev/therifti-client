import { useState } from "react";
import styles from "./ProductCard.module.css";
import { Heart } from "../../components/icons";
import { ImageOff } from "lucide-react";

type ProductCardProps = {
  image?: string;
  brand?: string;
  meta?: string;
  price?: string;
  likes?: string;
  isLoading?: boolean; // <-- Added loading prop
};

const ProductCard = ({
  image,
  brand = "",
  meta = "M30 . Good",
  price = "",
  likes = "1.2k",
  isLoading,
}: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);

  // --- MASTER SKELETON LAYOUT ---
  if (isLoading) {
    return (
      <article className={styles.card}>
        <div className={`${styles.media} ${styles.skeletonPulse}`} />
        <div className={styles.info}>
          <div className={styles.row}>
            <div className={`${styles.skeletonText} ${styles.skeletonPulse}`} style={{ width: '60%' }} />
            <div className={`${styles.skeletonText} ${styles.skeletonPulse}`} style={{ width: '25%' }} />
          </div>
          <div className={`${styles.skeletonText} ${styles.skeletonPulse}`} style={{ width: '40%', marginTop: '4px' }} />
        </div>
      </article>
    );
  }

  // --- REAL CONTENT ---
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        {image && !imageError ? (
          <img 
            className={styles.img} 
            src={image} 
            alt={brand} 
            loading="lazy" 
            onError={() => setImageError(true)} 
          />
        ) : (
          <div className={styles.placeholder}>
            <ImageOff size={32} color="#b0b0b0" strokeWidth={1.5} />
          </div>
        )}

        <div className={styles.likeBadge}>
          <Heart color="black" size={20} filled />
          <span className={styles.likesText}>{likes}</span>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.row}>
          <span className={styles.brand} title={brand}>{brand}</span>
          <span className={styles.price}>{price}</span>
        </div>
        <div className={styles.meta}>{meta}</div>
      </div>
    </article>
  );
};

export default ProductCard;