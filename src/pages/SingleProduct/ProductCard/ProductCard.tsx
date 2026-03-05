import React from 'react';
import { Heart } from 'lucide-react';
import styles from './ProductCard.module.css';
import type { Product } from './types';

interface Props {
  product: Product;
  isLiked?: boolean;
  onToggleLike?: (id: string) => void;
  onClick?: (product: Product) => void;
  isLoading?: boolean;
}

const ProductCard: React.FC<Props> = ({ product, isLiked, onToggleLike, onClick, isLoading }) => {
  if (isLoading) {
    return <div className={styles.skeletonCard} />;
  }

  return (
    <div className={styles.card} onClick={() => onClick && onClick(product)}>
      <div className={styles.imageBox}>
        <img src={product.images[0]} alt={product.title} className={styles.image} />
        <button 
          className={styles.likeBtn}
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike && onToggleLike(product._id);
          }}
        >
          <Heart size={16} fill={isLiked ? "black" : "none"} color={isLiked ? "black" : "gray"} />
          <span>{product.likes?.length || '1.2k'}</span>
        </button>
      </div>
      
      <div className={styles.info}>
        <div className={styles.details}>
          <p className={styles.brand}>{product.brand}</p>
          <p className={styles.condition}>{product.size} . {product.condition}</p>
        </div>
        <p className={styles.price}>${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;