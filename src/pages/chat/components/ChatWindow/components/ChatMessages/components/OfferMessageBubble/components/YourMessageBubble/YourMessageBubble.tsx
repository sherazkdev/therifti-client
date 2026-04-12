import React from "react";
import type { YourMessageBubblePropsInterface } from "./YourMessageBubble.types";
import { TailOutIcon } from "../../../../../../../../../../assets/icons/svgs/svg";
import styles from "./YourMessageBubble.module.css";


const YourMessageBubble: React.FC<YourMessageBubblePropsInterface> = ({ message }) => {
  return (
    <article className={styles.YourMessageBubble}>
      <div className={styles.youMessage}>
        {/* TailOut Icon */}
        <div>
          <TailOutIcon />
        </div>

        <div id="content-section" className={styles.content}>
          {/* Offered Price */}
          <div className={styles.offerSection}>
            <span className={styles.offeredPrice}>${message.offer?.offeredPrice}</span>

            {/* Original Price */}
            <span className={styles.orginalPrice}>$30.00</span>
          </div>

          {/* Status */}
          <span className={styles.status}>
            {message.offer?.status === "ACCEPTED" ? (<button className={styles.buyNowBtn}>Buy Now</button>) : message.offer?.status}
          </span>
        </div>
      </div>
    </article>
  );
};

export default YourMessageBubble;