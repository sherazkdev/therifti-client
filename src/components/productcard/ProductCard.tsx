import { useState } from "react";
import styles from "./ProductCard.module.css";
import { Heart } from "../../components/icons";
import { ImageOff } from "lucide-react";

type ProductCardProps = {
  image?: string;
  brand?: string;
  meta?: string;
  price?: number | string;
  likes?: number | string;
  condition?: string;
  parcelSize?: string;
  isLoading?: boolean;
};

const ProductCard = ({
  image,
  brand = "",
  meta = "",
  price = "",
  likes = "0",
  condition,
  parcelSize,
  isLoading,
}: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);

  if (isLoading) {
    return (
      <article className={styles.card}>
        <div className={`${styles.media} ${styles.skeletonPulse}`} />
        <div className={styles.info}>
          <div className={`${styles.skeletonText} ${styles.skeletonPulse}`} />
          <div className={`${styles.skeletonText} ${styles.skeletonPulse}`} />
        </div>
      </article>
    );
  }

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        {image && !imageError ? (
          <img
            src={image}
            className={styles.img}
            alt={brand}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.placeholder}>
            <ImageOff size={30} />
          </div>
        )}

        {/* CONDITION BADGE */}
        {condition && (
          <div className={styles.condition}>
            {condition.replaceAll("_", " ")}
          </div>
        )}

        {/* LIKES */}
        <div className={styles.likeBadge}>
          <Heart size={16} />
          <span className={styles.likesText}>{likes}</span>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.row}>
          <span className={styles.brand}>{brand}</span>

          <span className={styles.price}>
            ${Number(price).toLocaleString()}
          </span>
        </div>

        {meta && <div className={styles.meta}>{meta}</div>}

        {(condition || parcelSize) && (
          <div className={styles.extra}>
            {condition && <span>{condition.replaceAll("_", " ")}</span>}
            {parcelSize && <span>{parcelSize}</span>}
          </div>
        )}
      </div>
    </article>
  );
};

export default ProductCard;