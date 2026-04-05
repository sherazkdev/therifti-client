import styles from "./SingleProductSkeleton.module.css";
import ProductCardSkeleton from "../../../../components/Skeletons/ProductCardSkeleton/ProductCardSkeleton";

const SingleProductSkeleton = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={`${styles.skeletonPulse} ${styles.breadcrumb}`} />

      <div className={styles.topContainer}>
        <div className={styles.leftCol}>
          <div className={styles.gallery}>
            <div className={styles.thumbList}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`${styles.skeletonPulse} ${styles.thumb}`} />
              ))}
            </div>
            <div className={`${styles.skeletonPulse} ${styles.mainImg}`} />
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={`${styles.skeletonPulse} ${styles.statusBar}`} />

          <div className={styles.sidebarPanel}>
            <div className={`${styles.skeletonPulse} ${styles.quickLine}`} />
            <div className={`${styles.skeletonPulse} ${styles.brandLine}`} />
            <div className={`${styles.skeletonPulse} ${styles.title}`} />
            <div className={`${styles.skeletonPulse} ${styles.price}`} />
            <div className={`${styles.skeletonPulse} ${styles.linkLine}`} />
            <div className={`${styles.skeletonPulse} ${styles.pill}`} />

            <div className={styles.infoRows}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={styles.infoRow}>
                  <div className={`${styles.skeletonPulse} ${styles.infoLeft}`} />
                  <div className={`${styles.skeletonPulse} ${styles.infoRight}`} />
                </div>
              ))}
            </div>

            <div className={`${styles.skeletonPulse} ${styles.grayBox}`} />
            <div className={`${styles.skeletonPulse} ${styles.promoBox}`} />

            <div className={`${styles.skeletonPulse} ${styles.btn}`} />
            <div className={`${styles.skeletonPulse} ${styles.btn}`} />
            <div className={`${styles.skeletonPulse} ${styles.btn}`} />
          </div>

          <div className={`${styles.skeletonPulse} ${styles.protectionBox}`} />

          <div className={styles.sellerRow}>
            <div className={`${styles.skeletonPulse} ${styles.avatar}`} />
            <div className={styles.sellerText}>
              <div className={`${styles.skeletonPulse} ${styles.row}`} />
              <div className={`${styles.skeletonPulse} ${styles.rowSmall}`} />
            </div>
          </div>

          <div className={`${styles.skeletonPulse} ${styles.metaCard}`} />
          <div className={`${styles.skeletonPulse} ${styles.followBtn}`} />
          <div className={`${styles.skeletonPulse} ${styles.legal}`} />
        </div>
      </div>

      <section className={styles.section}>
        <div className={`${styles.skeletonPulse} ${styles.sectionTitle}`} />
        <div className={`${styles.skeletonPulse} ${styles.bundleBanner}`} />
        <div className={styles.cardGrid}>
          {[1, 2, 3, 4].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
        <div className={`${styles.skeletonPulse} ${styles.seeMore}`} />
      </section>

      <section className={styles.section}>
        <div className={styles.recHeader}>
          <div className={`${styles.skeletonPulse} ${styles.sectionTitle}`} />
          <div className={`${styles.skeletonPulse} ${styles.viewAllSkel}`} />
        </div>
        <div className={styles.cardGrid}>
          {[1, 2, 3, 4].map((i) => (
            <ProductCardSkeleton key={`r-${i}`} />
          ))}
        </div>
        <div className={`${styles.skeletonPulse} ${styles.seeMore}`} />
      </section>
    </div>
  );
};

export default SingleProductSkeleton;
