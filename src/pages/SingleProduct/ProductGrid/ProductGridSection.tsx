import React, { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductGridSection.module.css';
import type { Product } from '../types';

interface Props {
  title: string;
  products: Product[];
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

  // --- THE LAYOUT-HOLDING SKELETON FOR THE GRID ---
  if (isLoading) {
    return (
      <section className={styles.sectionWrapper}>
        <div className={`${styles.skeletonPulse} ${styles.skelGridTitle}`} />
        
        {showBundlesUI && (
          <div className={`${styles.skeletonPulse} ${styles.skelBanner}`} />
        )}
        
        <div className={styles.grid}>
          {Array.from({ length: initialCount }).map((_, i) => (
            <ProductCard key={i} product={{} as Product} isLoading={true} />
          ))}
        </div>
      </section>
    );
  }

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
        {products.slice(0, visibleCount).map((product) => (
          <ProductCard 
            key={product._id} 
            product={product} 
            isLiked={false} 
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