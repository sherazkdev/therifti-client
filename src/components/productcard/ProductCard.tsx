import { useState } from "react";
import styles from "./ProductCard.module.css";
import { Heart } from "../../components/icons";
import { ImageOff } from "lucide-react"; // Added a nice fallback icon

type ProductCardProps = {
  image?: string;
  brand: string;
  meta?: string;
  price: string;
  likes?: string;
};

const ProductCard = ({
  image,
  brand,
  meta = "M30 . Good",
  price,
  likes = "1.2k",
}: ProductCardProps) => {
  // Track if the image URL provided by the backend is broken/returns a 404
  const [imageError, setImageError] = useState(false);

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        {/* Only show the image if the URL exists AND it hasn't failed to load */}
        {image && !imageError ? (
          <img 
            className={styles.img} 
            src={image} 
            alt={brand} 
            loading="lazy" // Performance boost for pagination
            onError={() => setImageError(true)} // Instantly switch to placeholder if broken
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