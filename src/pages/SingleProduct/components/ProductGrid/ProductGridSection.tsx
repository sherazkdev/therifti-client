import React, { useState } from 'react';
import ProductCard from '../../../../components/ProductCard/ProductCard';
import styles from './ProductGridSection.module.css';
import type { ProductDocument } from '../../../../types/api';

interface Props {
  title: string;
  products: ProductDocument[];
  isLoading?: boolean;
  showBundlesUI?: boolean; 
  initialCount?: number; 
}

const ProductGridSection: React.FC<Props> = ({ title, products, isLoading, showBundlesUI, initialCount = 4 }) => {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const handleSeeMore = () => { 
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + initialCount);
      setIsLoadingMore(false);
    }, 800);
  };

  // --- THE REAL CONTENT ---
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {/* Removed the View All button from here! */}
      </div>

      {showBundlesUI && (
        <div className={styles.bundleBanner}>
          <div>
            <strong>Shop Bundles</strong>
            <p className={styles.bundleSubtext}>Save on Postage</p>
          </div>
          <button className={styles.createBundleBtn}>Create Bundles</button>
        </div>
      )}

      <div className={styles.grid}>
        {products.slice(0, visibleCount).map((product:ProductDocument) => (
          <ProductCard 
            key={product._id}
            _id={product._id}
            brand={product.brand}
            condition={product.condition}
            coverImage={product.coverImage}
            likes={12}
            isLoading={false}
            isLiked={false}
            meta={product.title}
            parcelSize={product.parcelSize}
            price={product.price}
            
          />
        ))}
      </div>

      {!isLoading && visibleCount < products.length && (
        <div className={styles.seeMoreWrapper}>
          <button 
            className={styles.seeMoreBtn} 
            onClick={handleSeeMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "Loading..." : "See More"}
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductGridSection;