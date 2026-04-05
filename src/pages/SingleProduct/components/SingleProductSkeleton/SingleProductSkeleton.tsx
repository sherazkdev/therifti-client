import styles from "./SingleProductSkeleton.module.css";

const SingleProductSkeleton = () => {
  return (
    <div className={styles.pageWrapper}>
      
      {/* breadcrumb */}
      <div className={`${styles.skeletonPulse} ${styles.breadcrumb}`} />

      {/* TOP */}
      <div className={styles.topContainer}>

        {/* LEFT IMAGE */}
        <div className={styles.leftCol}>

          <div className={styles.gallery}>

            <div className={styles.thumbList}>
              {[1,2,3].map(i => (
                <div key={i} className={`${styles.skeletonPulse} ${styles.thumb}`} />
              ))}
            </div>

            <div className={`${styles.skeletonPulse} ${styles.mainImg}`} />

          </div>

        </div>


        {/* RIGHT DETAILS */}
        <div className={styles.rightCol}>

          <div className={`${styles.skeletonPulse} ${styles.title}`} />
          <div className={`${styles.skeletonPulse} ${styles.row}`} />
          <div className={`${styles.skeletonPulse} ${styles.price}`} />

          <div className={`${styles.skeletonPulse} ${styles.box}`} />

          <div className={styles.infoGrid}>
            {[1,2,3,4].map(i => (
              <div key={i} className={`${styles.skeletonPulse} ${styles.row}`} />
            ))}
          </div>

          <div className={`${styles.skeletonPulse} ${styles.btn}`} />
          <div className={`${styles.skeletonPulse} ${styles.btn}`} />
          <div className={`${styles.skeletonPulse} ${styles.btn}`} />

        </div>

      </div>


      {/* SELLER CARD */}
      <div className={styles.sellerCard}>

        <div className={`${styles.skeletonPulse} ${styles.avatar}`} />

        <div className={styles.sellerText}>
          <div className={`${styles.skeletonPulse} ${styles.row}`} />
          <div className={`${styles.skeletonPulse} ${styles.rowSmall}`} />
        </div>

        <div className={`${styles.skeletonPulse} ${styles.followBtn}`} />

      </div>


      {/* MEMBER ITEMS */}
      <div className={styles.section}>

        <div className={`${styles.skeletonPulse} ${styles.sectionTitle}`} />

        <div className={styles.grid}>
          {[1,2,3,4].map(i => (
            <div key={i} className={`${styles.skeletonPulse} ${styles.card}`} />
          ))}
        </div>

      </div>


      {/* RECOMMENDED */}
      <div className={styles.section}>

        <div className={`${styles.skeletonPulse} ${styles.sectionTitle}`} />

        <div className={styles.grid}>
          {[1,2,3,4].map(i => (
            <div key={i} className={`${styles.skeletonPulse} ${styles.card}`} />
          ))}
        </div>

      </div>

    </div>
  );
};

export default SingleProductSkeleton;