import React from 'react';
import { ShieldCheck, Truck } from 'lucide-react'; 
import styles from './ProductDetails.module.css';
import type { Product } from '../types';

interface Props {
  product: Product | null;
  isLoading?: boolean;
  onAskSeller?: () => void;
  isCreatingChat?: boolean;
}

const ProductDetails: React.FC<Props> = ({ product, isLoading, onAskSeller, isCreatingChat }) => {
  if (isLoading || !product) {
    return (
      <div className={styles.container}>
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
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{product.title}</h1>
      <p className={styles.subtitle}>{product.condition} - {product.brand}</p>

      <div className={styles.priceRow}>
        <span className={styles.oldPrice}>$70.00</span>
        <span className={styles.newPrice}>${product.price}</span>
      </div>

      <div className={styles.protectionBanner}>
        <ShieldCheck size={16} /> Includes Buyer Protection
      </div>
      
      <button className={styles.discountBadge}>
        <Truck size={16} /> Upto -100% postage
      </button>

      <div className={styles.infoGrid}>
        <div className={styles.infoRow}><span>Brand</span> <strong>{product.brand}</strong></div>
        <div className={styles.infoRow}><span>Size</span> <strong>{product.size}</strong></div>
        <div className={styles.infoRow}><span>Condition</span> <strong>{product.condition}</strong></div>
        <div className={styles.infoRow}><span>Color</span> <strong>{product.colors?.join(', ')}</strong></div>
        <div className={styles.infoRow}><span>Uploaded</span> <strong>{product.createdAt}</strong></div>
      </div>

      <div className={styles.brandBox}>Brand new with box</div>

      <div className={styles.postageRow}>
        <span>Postage:</span> <strong>from £0.00</strong>
      </div>

      <div className={styles.checkoutPromo}>
        <p>Get discounts of up to 100% off for pick-up point delivery.</p>
        <span className={styles.mutedText}>See further details at checkout.</span>
      </div>

      <div className={styles.actionButtons}>
        <button className={styles.buyBtn}>Buy Now</button>
        <button className={styles.offerBtn}>Make an offer</button>
        <button 
          className={styles.askBtn} 
          onClick={onAskSeller}
          disabled={isCreatingChat}
        >
          {isCreatingChat ? "Creating..." : "Ask Seller"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;