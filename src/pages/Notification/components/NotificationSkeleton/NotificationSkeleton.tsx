import React from "react";
import styles from "./NotificationSkeleton.module.css";

const NotificationSkeleton = () => {
  // Array of dummy skeleton items
  const skeletonItems = Array.from({ length: 5 });

  return (
    <div className={styles.page}>
      <div className={styles.notificationContainer}>
        {/* Header */}
        <div className={styles.header}>
          <div className={`${styles.skeletonPulse}`} style={{ width: "200px", height: "24px", borderRadius: "6px" }} />
          <div className={`${styles.skeletonPulse}`} style={{ width: "100px", height: "32px", borderRadius: "8px" }} />
        </div>

        {/* List */}
        <div className={styles.list}>
          {skeletonItems.map((_, i) => (
            <div key={i} className={styles.itemButton}>
              {/* Icon */}
              <div className={`${styles.icon} ${styles.skeletonPulse}`} />

              {/* Content */}
              <div className={styles.content}>
                <div className={`${styles.skeletonPulse} ${styles.skeletonText}`} style={{ width: "60%" }} />
                <div className={`${styles.skeletonPulse} ${styles.skeletonText}`} style={{ width: "80%", marginTop: "6px" }} />
              </div>

              {/* Time */}
              <div className={`${styles.time} ${styles.skeletonPulse}`} style={{ width: "40px", height: "12px" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationSkeleton;