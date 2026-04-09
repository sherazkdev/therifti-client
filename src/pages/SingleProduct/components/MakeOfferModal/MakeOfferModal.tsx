import React, { useMemo, useState } from "react";
import { X } from "lucide-react";
import type { GetSingleProductResponseInterface } from "../../../../types/api";
import useSendOffer from "../../../../hooks/server/message/useSendOffer";
import styles from "./MakeOfferModal.module.css";
import { useNavigate } from "react-router-dom";

/** Matches typical buyer-protection line (~9.7% on subtotal in reference UI). */
const BUYER_PROTECTION_RATE = 0.097;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  product: {
    _id:string,
    owner:{
      _id:string,
    };
    title:string,
    coverImage:string
    price:number
  };
};

function parsePrice(price: string | number): number {
  const n = typeof price === "number" ? price : parseFloat(String(price).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function formatMoney(n: number): string {
  return n.toFixed(2);
}

const MakeOfferModal: React.FC<Props> = ({ isOpen, onClose, product }) => {
  const sendOfferMutation = useSendOffer();
  const basePrice = parsePrice(product.price);

  const [selection, setSelection] = useState<"10" | "15" | "20" | "custom">("10");
  const [customInput, setCustomInput] = useState("");
  const [error, setError] = useState("");

  /** Note: For redirection */
  const Redirect = useNavigate();

  const presetAmounts = useMemo(() => {
    return {
      "10": Math.round(basePrice * 0.9 * 100) / 100,
      "15": Math.round(basePrice * 0.85 * 100) / 100,
      "20": Math.round(basePrice * 0.8 * 100) / 100,
    };
  }, [basePrice]);

  const offeredPrice = useMemo(() => {
    if (selection === "custom") {
      const v = parseFloat(customInput.replace(/[^0-9.]/g, ""));
      return Number.isFinite(v) ? Math.round(v * 100) / 100 : 0;
    }
    return presetAmounts[selection];
  }, [selection, customInput, presetAmounts]);

  const totalWithProtection = useMemo(
    () => Math.round(offeredPrice * (1 + BUYER_PROTECTION_RATE) * 100) / 100,
    [offeredPrice]
  );

  const discountPercent = useMemo(() => {
    if (selection === "custom" || !basePrice) return null;
    if (selection === "10") return 10;
    if (selection === "15") return 15;
    return 20;
  }, [selection, basePrice]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    setError("");
    if (offeredPrice <= 0) {
      setError("Enter a valid offer amount.");
      return;
    }
    if (offeredPrice >= basePrice) {
      setError("Your offer should be below the listing price.");
      return;
    }
    const sendOfferPayload = {
      receiverId: product.owner._id,
      productId: product._id,
      offeredPrice
    };

    sendOfferMutation.mutate(sendOfferPayload,
      {
        onSuccess: (res) => {
          if (res?.success) {
            onClose();
            Redirect(`/inbox/${res.data.chatId}`,{replace:false});
          } else {
            setError(res?.message ?? "Could not send offer.");
          }
        },
        onError: (e) => {
          console.log(e);
          const msg = (e as { response?: { data?: { message?: string } } })?.response?.data?.message;
          setError(typeof msg === "string" ? msg : "Could not send offer. Try again.");
        },
      }
    );
  };

  const coverSrc = product.coverImage;

  return (
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="make-offer-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 id="make-offer-title" className={styles.title}>
            Make an offer
          </h2>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <X size={22} />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.productRow}>
            {coverSrc ? <img src={coverSrc} alt="" className={styles.thumb} /> : <div className={styles.thumb} />}
            <div className={styles.productMeta}>
              <p className={styles.productTitle}>{product.title}</p>
              <p className={styles.itemPrice}>
                Item price: <strong>${formatMoney(basePrice)}</strong>
              </p>
            </div>
          </div>

          <div className={styles.presetGrid}>
            {(["10", "15", "20"] as const).map((key) => (
              <button
                key={key}
                type="button"
                className={`${styles.presetBox} ${selection === key ? styles.selected : ""}`}
                onClick={() => setSelection(key)}
              >
                <span className={styles.presetPrice}>${formatMoney(presetAmounts[key])}</span>
                <span className={styles.presetSub}>{key}% off</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            className={`${styles.presetBox} ${selection === "custom" ? styles.selected : ""}`}
            style={{ width: "100%", marginBottom: 12 }}
            onClick={() => setSelection("custom")}
          >
            <span className={styles.presetLabel}>Custom</span>
            <span className={styles.presetSub}>Set a price</span>
          </button>

          {selection === "custom" && (
            <div className={styles.customRow}>
              <label className={styles.customLabel} htmlFor="custom-offer-amount">
                Your offer (USD)
              </label>
              <input
                id="custom-offer-amount"
                className={styles.customInput}
                inputMode="decimal"
                placeholder="0.00"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
              />
            </div>
          )}

          <div className={styles.breakdown}>
            <div className={styles.breakdownRow}>
              <span>Offer</span>
              <span>${formatMoney(offeredPrice)}</span>
            </div>
            <div className={styles.breakdownRow}>
              <span>Total with Buyer Protection</span>
              <span>${formatMoney(totalWithProtection)}</span>
            </div>
          </div>

          <p className={styles.hint}>
            Offers are sent to the seller for review. You can adjust your selection before sending.
          </p>

          {error ? <p className={styles.errorText}>{error}</p> : null}

          <button
            type="button"
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={sendOfferMutation.isPending}
          >
            {sendOfferMutation.isPending ? "Sending…" : "Offer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakeOfferModal;
