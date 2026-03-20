import React from 'react';
import ProductCardSkeleton from '../../../../components/Skeletons/ProductCardSkeleton/ProductCardSkeleton';

/** Styles */
import styles from "./SingleProductSkeleton.module.css";

const SingleProductSkeleton:React.FC = () => {

    return (
        <div id="singleProductSkeleton">
            
            <div className={styles.topContainer}>
                {/* Image Gallery Skeleton */}
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

                {/* Product Details Skeletons */}
                <div className={styles.productDetailContainer}>
                    <div className={`${styles.skeletonPulse} ${styles.skelTitle}`} />
                    <div className={`${styles.skeletonPulse} ${styles.skelSubtitle}`} />
                    <div className={`${styles.skeletonPulse} ${styles.skelPrice}`} />
                    <div className={`${styles.skeletonPulse} ${styles.skelBanner}`} />
                    <div className={`${styles.skeletonPulse} ${styles.skelBadge}`} />
                    
                    <div className={styles.skelGrid}>
                    <div className={`${styles.skeletonPulse} ${styles.skelRow}`} />
                    <div className={`${styles.skeletonPulse} ${styles.skelRow}`} />
                    <div className={`${styles.skeletonPulse} ${styles.skelRow}`} />
                    <div className={`${styles.skeletonPulse} ${styles.skelRow}`} />
                    </div>

                    <div className={`${styles.skeletonPulse} ${styles.skelBox}`} />
                    <div className={`${styles.skeletonPulse} ${styles.skelPromo}`} />
                    
                    <div className={styles.skelButtons}>
                    <div className={`${styles.skeletonPulse} ${styles.skelBtn}`} />
                    <div className={`${styles.skeletonPulse} ${styles.skelBtn}`} />
                    <div className={`${styles.skeletonPulse} ${styles.skelBtn}`} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SingleProductSkeleton;
