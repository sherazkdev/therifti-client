import React, { useEffect, useState } from 'react';
import { Clock, MapPin, ShieldCheck, Star, Truck } from 'lucide-react'; 
import styles from './ProductDetails.module.css';
import type { ApiError, CreateChatInterface, GetSingleProductResponseInterface } from '../../../../types/api';
import type { ProductCondition } from '../../../../types/components';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
  product: GetSingleProductResponseInterface;
  onAskSeller?: () => void;
  isCreatingChat?: boolean;
}

import userEmptyState from "../../../../assets/icons/user-empty-state.svg";


/** Hooks */
import useFollowSeller from '../../../../hooks/server/follow/useFollowSeller';
import useUnfollowSeller from '../../../../hooks/server/follow/useUnfollowSeller';
import useCreateChat from '../../../../hooks/server/chat/useCreateChat';

import { CHAT_ERROR_CODES } from '../../../../constants/errors/chat.errors';

const ProductDetails: React.FC<Props> = ({ product, onAskSeller, isCreatingChat }) => {
  const [productDetails,setProductDetails] = useState<GetSingleProductResponseInterface>(product)

  const Redirect = useNavigate();

  /** Hooks */
  const followSellerMutation = useFollowSeller();
  const unfollowSellerMutation = useUnfollowSeller();
  const createChatMuatation = useCreateChat(); 

  function capitalizeFirst(str:string[]) {
    return str.map( (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
  }

  const displayProductCondition = (condition:ProductCondition) => {
    if(condition === "GOOD") return "Good";
    if(condition === "NEW_WITHOUT_TAGS") return "New without tags";
    if(condition === "VERY_GOOD") return "Very good";
    if(condition === "NEW_WITH_TAGS") return "New with tags";
    if(condition === "SATISFACTORY") return "Satisfactory";
  };

  /** Note: Handle Follow Seller */
  const handleFollowSeller = async () => {
    followSellerMutation.mutate(productDetails.owner._id, {
      onError:(e) => {
        const err = e.response?.data as ApiError || undefined;
        if(err){
          if(err.message === CHAT_ERROR_CODES.ALREADY_EXIST && err.statusCode === 400 && err.success === false){

          }
        }
      },
      onSuccess:(res) => {
        console.log(res)
        if(res.statusCode === 200 && res.success === true){
          setProductDetails( (prevDetails) => ({...prevDetails,isFollowed:true}));
        }
      }
    });
  };
  
  /** Note: Handle Unfollow Seller */
  const handleUnfollowSeller = async () => {
    unfollowSellerMutation.mutate(productDetails.owner._id,{
      onError:(e) => {
        const err = e.response?.data as ApiError || undefined;
        if(err){
          return console.log(err);
        }
      },
      onSuccess:(res) => {
        if(res.success === true && res.statusCode === 202){
          setProductDetails( (prevDetails) => ({...prevDetails,isFollowed:false}));
        }
      }
    })
  };

  /** Note: Handle Ask Seller */
  const handleAskSeller = async () => {

    /** Note: Create Chat Payload. */
    const createChatPayload:CreateChatInterface = {
      productRef:productDetails._id,
      member:productDetails.owner._id
    };
    createChatMuatation.mutate(createChatPayload,{
      onError:(e) => {
        const err = e.response?.data as ApiError || undefined;
        if(err){
          return console.log(err);
        }
      },
      onSuccess:(res) => {
        if(res.statusCode === 201 && res.success === true){
          Redirect(`/inbox/${res.data._id}`);
        }
      }
    })

  };

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
          onClick={handleAskSeller}
          disabled={isCreatingChat}
        >
          {createChatMuatation.isPending ? <div className='loader'></div> : "Ask Seller"}
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
                      {productDetails.owner.avatar ? (
                        <img src={productDetails.owner.avatar || userEmptyState} onError={ (e) => e.currentTarget.src = userEmptyState} alt={productDetails.owner.fullname} />
                      ) : (
                        <span className={styles.avatarPlaceholder}>{productDetails.owner.username.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <div>
                      <Link to={`/member/${productDetails.owner._id}`} className={styles.sellerName}>
                        @{productDetails.owner.username}
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
                    
                    {productDetails.owner.country && 
                      <div className={styles.statRow}>
                        <MapPin size={16} className={styles.statIcon} />
                        <span>{productDetails.owner.city}, {productDetails.owner.country}</span>
                      </div>
                    }
                    
                    <div className={styles.statRow}>
                      <Clock size={16} className={styles.statIcon} />
                      <span>Last seen </span>
                    </div>
                  </div>

                  {productDetails.isFollowed && (<button onClick={handleUnfollowSeller} className={styles.isFollowed}>{unfollowSellerMutation.isPending ? <div className='loader'></div> : "Unfollow"}</button>)}
                  {!productDetails.isFollowed && (<button onClick={handleFollowSeller} className={styles.followBtn}>{followSellerMutation.isPending ? <div className='loader'></div> : "Follow"}</button>)}
              
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