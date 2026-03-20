import React from 'react';

/** Styles */
import styles from "./ProductCardSkeleton.module.css";

const ProductCardSkeleton:React.FC = () => {
    return (
        <>
            <article className={styles.card}>
                <div className={`${styles.media} ${styles.skeletonPulse}`} />
                <div className={styles.info}>
                <div className={`${styles.skeletonText} ${styles.skeletonPulse}`} />
                <div className={`${styles.skeletonText} ${styles.skeletonPulse}`} />
                </div>
            </article>
        </>
    );
}

export default ProductCardSkeleton;