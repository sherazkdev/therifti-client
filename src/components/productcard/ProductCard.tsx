import styles from "./ProductCard.module.css";
import { Heart } from "../../components/icons";

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
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        {image ? (
          <img className={styles.img} src={image} alt={brand} />
        ) : (
          <div className={styles.placeholder} />
        )}

        <div className={styles.likeBadge}>
          {/* Heart icon */}
          <Heart color="black" size={20} filled />
          <span className={styles.likesText}>{likes}</span>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.row}>
          <span className={styles.brand}>{brand}</span>
          <span className={styles.price}>{price}</span>
        </div>
        <div className={styles.meta}>{meta}</div>
      </div>
    </article>
  );
};

export default ProductCard;
