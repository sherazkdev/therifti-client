import { useState } from "react";
import styles from "./ProductCard.module.css";
import { ImageOff, Heart } from "lucide-react";

/** Types */
import type { ProductCardPropsInterface } from "../../types/components";
import { Link } from "react-router-dom";

/** Hooks */
import useAddToWishlist from "../../hooks/server/wishlist/useAddToWishlist";
import useRemoveToWishlist from "../../hooks/server/wishlist/useRemoveToWishlist";
import type { ApiError } from "../../types/api";

const ProductCard:React.FC<ProductCardPropsInterface> = (productDocument) => {
  const [imageError, setImageError] = useState(false);
  const [product,setProduct] = useState<ProductCardPropsInterface>(productDocument);

  const {isLiked,_id,brand,condition,coverImage,isLoading,likes,meta,parcelSize,price} = product;

  const addToWishlistMuatation = useAddToWishlist();
  const RemoveToWishlistMuatation = useRemoveToWishlist();

  if (isLoading) {
    return (
      <>
        {Array.from({length:3}).fill(null).map( (_y,index) => (
          <article key={index} className={styles.card}>
            <div className={`${styles.media} ${styles.skeletonPulse}`} />
            <div className={styles.info}>
              <div className={`${styles.skeletonText} ${styles.skeletonPulse}`} />
              <div className={`${styles.skeletonText} ${styles.skeletonPulse}`} />
            </div>
          </article>
        ))}
      </>
    );
  }

  /** Note: Handle Add To Wishlist */
  const handleAddToWishlist = () => {
      addToWishlistMuatation.mutate(_id as string,{
        onSuccess:(res) => {
          if(res.statusCode === 202 && res.success === true){
            return setProduct( (prev) => ({...prev,isLiked:true,likes:(likes as number) + 1}));
          }
        },
        onError:(e) => {
          const err = e.response?.data as ApiError || undefined;
          if(err){
            return e;
          }
        }
      });
  };

  /** Handle Remove To Wishlist */
  const handleRemoveToWishlist = () => {
    RemoveToWishlistMuatation.mutate(_id as string,{
      onSuccess:(res) => {
        if(res.statusCode === 202 &&  res.success === true){
          return setProduct( (prev) => ({...prev,isLiked:false,likes:(likes as number) - 1}));
        }
      },
      onError:(e) => {
        const err = e.response?.data as ApiError;
        if(err){
          return;
        }
      }
    });
  };

  return (
      <article className={styles.card}>
        <div className={styles.media}>
          
          <Link style={{textDecoration:"none"}} to={`/product/${_id}`}>
            {coverImage && !imageError ? (
              <img
                src={coverImage}
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
          </Link>

          {/* CONDITION BADGE */}
          {condition && (
            <div className={styles.condition}>
              {condition.replaceAll("_", " ")}
            </div>
          )}

          {/* LIKES */}
          <div className={styles.likeBadge}>
            {isLiked === true ? <Heart color="red" fill="red" size={18} onClick={handleRemoveToWishlist} /> : <Heart onClick={handleAddToWishlist} size={18} />}
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