import React from "react";

/** Styles */
import styles from "./Favourite.module.css";

import useWishlist from "../../hooks/server/wishlist/useWishlist";
import ProductCard from "../../components/productcard/ProductCard";
import { ContentFallback } from "../../components/ContentFallback/ContentFallback";

const Favourite = () => {
  const { data, isPending, isError } = useWishlist();
  const wishlists = data?.success && Array.isArray(data.data) ? data.data : [];
  const showEmpty =
    !isPending && !isError && data?.success === true && wishlists.length === 0;
  const showError = !isPending && isError;

  return (
    <main className={styles.wrapper}>
      <div id="main-header" className={styles.topMain}>
        <h1 className={styles.mainHeader}>Favorited Items</h1>
      </div>

      <section
        className={showEmpty || showError ? styles.gridEmpty : styles.grid}
      >
        {showError && (
          <div className={styles.emptyState}>
            <ContentFallback
              title="Unable to load favorites"
              description="Something went wrong while loading your list. Please try again later."
              primaryAction={{ label: "Browse Products", to: "/catalog" }}
            />
          </div>
        )}
        {showEmpty && (
          <div className={styles.emptyState}>
            <ContentFallback
              title="No Favorites Found"
              description="You have not saved any items yet. Browse the catalog and tap the heart to add favorites here."
              primaryAction={{ label: "Browse Products", to: "/catalog" }}
            />
          </div>
        )}
        {isPending &&
          [0, 1, 2].map((i) => <ProductCard key={`fav-skeleton-${i}`} isLoading />)}
        {!isPending && !showEmpty && !showError &&
          wishlists.map((fav) => (
            <ProductCard
              key={fav._id}
              _id={fav.product._id}
              brand={fav.product.brand}
              condition={fav.product.condition}
              coverImage={fav.product.coverImage}
              isLiked={fav.isLiked}
              likes={fav.totalLikes}
              meta={fav.product.title}
              parcelSize={fav.product.parcelSize}
              price={fav.product.price}
            />
          ))}
      </section>
    </main>
  );
};

export default Favourite;