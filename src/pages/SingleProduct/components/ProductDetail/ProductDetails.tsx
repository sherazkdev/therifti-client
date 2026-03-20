import React from 'react';
import { Clock, MapPin, ShieldCheck, Star, Truck } from 'lucide-react'; 
import styles from './ProductDetails.module.css';
import type { GetSingleProductResponseInterface } from '../../../../types/api';
import type { ProductCondition } from '../../../../types/components';
import { Link } from 'react-router-dom';

interface Props {
  product: GetSingleProductResponseInterface;
  onAskSeller?: () => void;
  isCreatingChat?: boolean;
}

import userEmptyState from "../../../../assets/icons/user-empty-state.svg";

const ProductDetails: React.FC<Props> = ({ product, onAskSeller, isCreatingChat }) => {

  function capitalizeFirst(str:string[]) {
    return str.map( (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
  }
  const displayProductCondition = (condition:ProductCondition) => {
    if(condition === "GOOD") return "Good";
    if(condition === "NEW_WITHOUT_TAGS") return "New without tags";
    if(condition === "VERY_GOOD") return "Very good";
    if(condition === "NEW_WITH_TAGS") return "New with tags";
    if(condition === "SATISFACTORY") return "Satisfactory";
  }
  return (
    <>
    <div className={styles.container}>
      <h1 className={styles.title}>{product.title}</h1>
      <p className={styles.subtitle}>{displayProductCondition(product.condition)} - {product.brand.brand}</p>

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
        <div className={styles.infoRow}><span>Brand</span> <strong>{product.brand.brand}</strong></div>
        <div className={styles.infoRow}><span>Size</span> <strong>{product.sizes.map( (s) => s.international).join(", ")}</strong></div>
        <div className={styles.infoRow}><span>Condition</span> <strong>{displayProductCondition(product.condition)}</strong></div>
        <div className={styles.infoRow}><span>Color</span> <strong>{capitalizeFirst(product.colors).join(', ')}</strong></div>
        <div className={styles.infoRow}><span>Uploaded</span> <strong>12 Jun 2025</strong></div>
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
    <div className={styles.memberRight}>
              <div className={styles.buyerProtectionBox}>
                <h4>Buyer Protection Fee</h4>
                <p>Our Buyer Protection is added to every purchase made with the "Buy now" button. Includes our <a href="#">Refund Policy</a>.</p>
              </div>

              <div className={styles.sellerCard}>
                  <div className={styles.sellerHeader}>
                    <div className={styles.sellerAvatar}>
                      {product.owner.avatar ? (
                        <img src={product.owner.avatar || userEmptyState} onError={ (e) => e.currentTarget.src = userEmptyState} alt={product.owner.fullname} />
                      ) : (
                        <span className={styles.avatarPlaceholder}>{product.owner.username.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <div>
                      <Link to={`/member/${product.owner._id}`} className={styles.sellerName}>
                        @{product.owner.username}
                      </Link>
                      {/* Real Lucide Stars */}
                      <div className={styles.sellerRating}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={14} fill="#f5c518" color="#f5c518" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <hr className={styles.divider} />
                  
                  <div className={styles.sellerStats}>
                    {/* Real Lucide Icons perfectly aligned */}
                    <div className={styles.statRow}>
                      <Truck size={18} className={styles.statIcon} />
                      <div>
                        <strong>Speedy Shipping</strong>
                        <p>Sends items promptly — usually within 24 hours.</p>
                      </div>
                    </div>
                    
                    <hr className={styles.divider} />
                    
                    {product.owner.country && 
                      <div className={styles.statRow}>
                        <MapPin size={16} className={styles.statIcon} />
                        <span>{product.owner.city}, {product.owner.country}</span>
                      </div>
                    }
                    
                    <div className={styles.statRow}>
                      <Clock size={16} className={styles.statIcon} />
                      <span>Last seen </span>
                    </div>
                  </div>

                  <button className={styles.followBtn}>Follow</button>
              </div>

              <div className={styles.buyerNotice}>
                <p>
                  Consumer protection laws do not apply to your purchases from other consumers. 
                  More specifically, the right to cancel <u>(section 29(1) of the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013)</u> and the right to reject <u>(section 20 of the Consumer Rights Act)</u> does not apply. Buyer's rights are significantly reduced when a sale is carried out between two individuals. More specifically, the following sections of the Consumer Rights Act 2015 do not apply: goods to be of satisfactory quality (section 9 of the Consumer Rights Act) and fit for a particular purpose (section 10 of the Consumer Rights Act).
                </p>
                <p>
                  Goods from private sellers do not have to be fault-free and if defects or marks were clearly mentioned by the seller or are visible in the seller’s photograph, then you do not have a case against the seller. However, if the seller’s goods do not match the description, you have the right to ask for a refund or compensation.
                </p>
                <p>
                  Every purchase you make using the ‘Buy now’ button is covered by our Buyer Protection service.
                </p>
              </div>
    </div>
    </>
    
  );
};

export default ProductDetails;