import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  Clock,
  Info,
  MapPin,
  Settings,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import styles from "./ProductDetails.module.css";
import type {
  ApiError,
  CreateChatInterface,
  GetSingleProductResponseInterface,
} from "../../../../types/api";
import type { ProductCondition } from "../../../../types/components";
import { Link, useNavigate } from "react-router-dom";
import MakeOfferModal from "../MakeOfferModal/MakeOfferModal";
import { useAuth } from "../../../../contexts/auth/auth.context";

import userEmptyState from "../../../../assets/icons/user-empty-state.svg";

import useFollowSeller from "../../../../hooks/server/follow/useFollowSeller";
import useUnfollowSeller from "../../../../hooks/server/follow/useUnfollowSeller";
import useCreateChat from "../../../../hooks/server/chat/useCreateChat";

import { CHAT_ERROR_CODES } from "../../../../constants/errors/chat.errors";

const BUYER_PROTECTION_DISPLAY_RATE = 0.097;

interface Props {
  product: GetSingleProductResponseInterface;
  onAskSeller?: () => void;
  isCreatingChat?: boolean;
}

function parseListPrice(price: string | number): number {
  const n = typeof price === "number" ? price : parseFloat(String(price).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function formatMaterials(materials: GetSingleProductResponseInterface["materials"]): string {
  if (!materials?.length) return "";
  return materials
    .map((m) => (typeof m === "string" ? m : m.material))
    .filter(Boolean)
    .join(", ");
}

function formatParcelLabel(parcelSize: string | undefined): string {
  if (!parcelSize) return "";
  const map: Record<string, string> = { SMALL: "Small", MEDIUM: "Medium", LARGE: "Large" };
  return map[parcelSize] ?? parcelSize;
}

function formatUploadedRelative(date: Date | string | undefined): string {
  if (!date) return "—";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "—";
  const diff = Date.now() - d.getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours >= 0 && hours < 48) {
    if (hours < 1) return "Just now";
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }
  const days = Math.floor(diff / 86400000);
  if (days >= 0 && days < 14) return `${days} day${days === 1 ? "" : "s"} ago`;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

const ProductDetails: React.FC<Props> = ({ product, isCreatingChat }) => {
  const { user } = useAuth();
  const [productDetails, setProductDetails] = useState<GetSingleProductResponseInterface>(product);
  const [offerModalOpen, setOfferModalOpen] = useState(false);

  const Redirect = useNavigate();

  const followSellerMutation = useFollowSeller();
  const unfollowSellerMutation = useUnfollowSeller();
  const createChatMuatation = useCreateChat();

  useEffect(() => {
    setProductDetails(product);
  }, [product]);

  const isOwner = Boolean(user?._id && productDetails.owner._id && user._id === productDetails.owner._id);

  function capitalizeFirst(str: string[]) {
    return str.map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase());
  }

  const displayProductCondition = (condition: ProductCondition) => {
    if (condition === "GOOD") return "Good";
    if (condition === "NEW_WITHOUT_TAGS") return "New without tags";
    if (condition === "VERY_GOOD") return "Very good";
    if (condition === "NEW_WITH_TAGS") return "New with tags";
    if (condition === "SATISFACTORY") return "Satisfactory";
    return condition;
  };

  const listPrice = parseListPrice(productDetails.price);
  const priceWithProtection = Math.round(listPrice * (1 + BUYER_PROTECTION_DISPLAY_RATE) * 100) / 100;
  const materialsLine = formatMaterials(productDetails.materials);
  const sizeLine = productDetails.sizes?.map((s) => s.international).join(", ") || "—";
  const uploadedLabel = formatUploadedRelative(productDetails.createdAt);

  const handleFollowSeller = async () => {
    followSellerMutation.mutate(productDetails.owner._id, {
      onError: (e) => {
        const err = (e.response?.data as ApiError) || undefined;
        if (err) {
          if (
            err.message === CHAT_ERROR_CODES.ALREADY_EXIST &&
            err.statusCode === 400 &&
            err.success === false
          ) {
            /* noop */
          }
        }
      },
      onSuccess: (res) => {
        if (res.statusCode === 200 && res.success === true) {
          setProductDetails((prevDetails) => ({ ...prevDetails, isFollowed: true }));
        }
      },
    });
  };

  const handleUnfollowSeller = async () => {
    unfollowSellerMutation.mutate(productDetails.owner._id, {
      onError: (e) => {
        const err = (e.response?.data as ApiError) || undefined;
        if (err) {
          return console.log(err);
        }
      },
      onSuccess: (res) => {
        if (res.success === true && res.statusCode === 202) {
          setProductDetails((prevDetails) => ({ ...prevDetails, isFollowed: false }));
        }
      },
    });
  };

  const handleAskSeller = async () => {
    const createChatPayload: CreateChatInterface = {
      productRef: productDetails._id,
      member: productDetails.owner._id,
    };
    createChatMuatation.mutate(createChatPayload, {
      onError: (e) => {
        const err = (e.response?.data as ApiError) || undefined;
        if (err) {
          return console.log(err);
        }
      },
      onSuccess: (res) => {
        if (res.statusCode === 201 && res.success === true) {
          Redirect(`/inbox/${res.data._id}`);
        }
      },
    });
  };

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className={styles.infoRowFigma}>
      <span className={styles.infoLabel}>{label}</span>
      <div className={styles.infoValueWrap}>
        <strong className={styles.infoValue}>{value}</strong>
        <button type="button" className={styles.infoIconBtn} aria-label={`About ${label}`}>
          <Info size={16} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <MakeOfferModal
        isOpen={offerModalOpen}
        onClose={() => setOfferModalOpen(false)}
        product={productDetails}
      />

      <div className={styles.sidebarStack}>
        {isOwner && (
          <div className={styles.statusBar} role="status">
            Check in Progress
          </div>
        )}

        <div className={styles.panel}>
          <p className={styles.quickLine}>
            {sizeLine} · {displayProductCondition(productDetails.condition)}
          </p>
          <p className={styles.brandLine}>{productDetails.brand.brand}</p>

          <h1 className={styles.titleFigma}>{productDetails.title}</h1>

          <div className={styles.priceBlock}>
            <div className={styles.priceRowFigma}>
              <span className={styles.priceMain}>${listPrice.toFixed(2)}</span>
              <span className={styles.priceSecondary}>${priceWithProtection.toFixed(2)}</span>
            </div>
            <a className={styles.protectionLink} href="#" onClick={(e) => e.preventDefault()}>
              Includes Buyer Protection?
            </a>
          </div>

          <button type="button" className={styles.postagePill}>
            <Truck size={16} /> Upto -100% postage
          </button>

          <div className={styles.infoTable}>
            <InfoRow label="Brand" value={productDetails.brand.brand} />
            <InfoRow label="Size" value={sizeLine} />
            <InfoRow label="Condition" value={displayProductCondition(productDetails.condition)} />
            <InfoRow label="Color" value={capitalizeFirst(productDetails.colors).join(", ")} />
            {materialsLine ? <InfoRow label="Material" value={materialsLine} /> : null}
            <InfoRow
              label="Parcel size"
              value={
                [formatParcelLabel(productDetails.parcelSize?.parcelSize), productDetails.parcelSize?.info]
                  .filter(Boolean)
                  .join(" — ") || "—"
              }
            />
            <InfoRow label="Uploaded" value={uploadedLabel} />
          </div>

          <div className={styles.postageBlock}>
            <span className={styles.postageLabel}>Postage from</span>
            <strong className={styles.postageAmount}>$0.00</strong>
          </div>

          <div className={styles.brandBox}>
            {productDetails.description?.trim()
              ? productDetails.description.trim().slice(0, 120) +
                (productDetails.description.trim().length > 120 ? "…" : "")
              : `${displayProductCondition(productDetails.condition)} — see photos and description.`}
          </div>

          <div className={styles.checkoutPromoFigma}>
            <Settings size={18} className={styles.promoIcon} aria-hidden />
            <div>
              <p>Get discounts of up to 100% off for pick-up point delivery.</p>
              <span className={styles.mutedText}>See further details at checkout.</span>
            </div>
          </div>

          <div className={styles.actionButtons}>
            {isOwner ? (
              <>
                <button type="button" className={styles.buyBtn}>
                  Bump
                </button>
                <button type="button" className={styles.outlineBtn}>
                  Mark as Sold
                </button>
                <button type="button" className={styles.outlineBtn}>
                  Make as Reserved
                </button>
                <button type="button" className={styles.outlineBtn}>
                  Edit Listing
                </button>
                <button type="button" className={styles.outlineBtn}>
                  Hide
                </button>
                <button type="button" className={styles.outlineBtnDanger}>
                  Delete
                </button>
              </>
            ) : (
              <>
                <button type="button" className={styles.buyBtn}>
                  Buy now
                </button>
                <button
                  type="button"
                  className={styles.offerBtn}
                  onClick={() => setOfferModalOpen(true)}
                >
                  Make an offer
                </button>
                <button
                  type="button"
                  className={styles.askBtn}
                  onClick={handleAskSeller}
                  disabled={isCreatingChat}
                >
                  {createChatMuatation.isPending ? <div className="loader"></div> : "Message seller"}
                </button>
              </>
            )}
          </div>
        </div>

        <div className={styles.buyerProtectionBoxFigma}>
          <div className={styles.protectionTitleRow}>
            <ShieldCheck size={18} className={styles.protectionShield} />
            <h4>Buyer Protection Fee</h4>
          </div>
          <p>
            Our Buyer Protection is added to every purchase made with the &quot;Buy now&quot; button.
            Includes our <a href="#">Refund Policy</a>.
          </p>
        </div>

        <Link to={`/member/${productDetails.owner._id}`} className={styles.sellerCardFigma}>
          <div className={styles.sellerAvatar}>
            {productDetails.owner.avatar ? (
              <img
                src={productDetails.owner.avatar || userEmptyState}
                onError={(e) => (e.currentTarget.src = userEmptyState)}
                alt={productDetails.owner.fullname}
              />
            ) : (
              <span className={styles.avatarPlaceholder}>
                {productDetails.owner.username.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div className={styles.sellerCardBody}>
            <span className={styles.sellerNameFigma}>@{productDetails.owner.username}</span>
            <div className={styles.sellerRating}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={14} fill="#f5c518" color="#f5c518" />
              ))}
            </div>
          </div>
          <ChevronRight size={20} className={styles.sellerChevron} aria-hidden />
        </Link>

        <div className={styles.sellerMetaCard}>
          <div className={styles.statRow}>
            <Truck size={18} className={styles.statIcon} />
            <div>
              <strong>Speedy Shipping</strong>
              <p>Sends items promptly — usually within 24 hours.</p>
            </div>
          </div>
          <hr className={styles.divider} />
          {productDetails.owner.country && (
            <div className={styles.statRow}>
              <MapPin size={16} className={styles.statIcon} />
              <span>
                {productDetails.owner.city}, {productDetails.owner.country}
              </span>
            </div>
          )}
          <div className={styles.statRow}>
            <Clock size={16} className={styles.statIcon} />
            <span>Last seen 8 hours ago</span>
          </div>
        </div>

        {!isOwner &&
          (productDetails.isFollowed ? (
            <button
              type="button"
              onClick={handleUnfollowSeller}
              className={styles.isFollowed}
            >
              {unfollowSellerMutation.isPending ? <div className="loader"></div> : "Unfollow"}
            </button>
          ) : (
            <button type="button" onClick={handleFollowSeller} className={styles.followBtn}>
              {followSellerMutation.isPending ? <div className="loader"></div> : "Follow"}
            </button>
          ))}

        <div className={styles.buyerNotice}>
          <p>
            Consumer protection laws do not apply to your purchases from other consumers. More
            specifically, the right to cancel and the right to reject may not apply to private sales.
          </p>
          <p>
            Every purchase you make using the &apos;Buy now&apos; button is covered by our Buyer
            Protection service.
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
