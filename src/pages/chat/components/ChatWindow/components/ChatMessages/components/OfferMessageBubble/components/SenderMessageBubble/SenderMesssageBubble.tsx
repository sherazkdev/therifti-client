import React, { useState } from "react";
import type { SenderMessageBubblePropsInterface } from "./SenderMessageBubble.types";
import { TailInIcon } from "../../../../../../../../../../assets/icons/svgs/svg";
import userEmptyState from "../../../../../../../../../../assets/icons/user-empty-state.svg";
import styles from "./SenderMessageBubble.module.css";

import useAcceptOffer from "../../../../../../../../../../hooks/server/message/useAcceptOffer";
import useCancelOffer from "../../../../../../../../../../hooks/server/message/useCancelOffer";
import type { MessageDocumentInterface, ApiError } from "../../../../../../../../../../types/api";

import MakeOfferModal from "../../../../../../../../../SingleProduct/components/MakeOfferModal/MakeOfferModal";

const SenderMessageBubble: React.FC<SenderMessageBubblePropsInterface> = ({ message,selectedChat }) => {
  const [offerMessage,setOfferMessage] = useState<MessageDocumentInterface>(message);
  const [makeAnOfferIsOpen,setMakeAnOffer] = useState<boolean>(false);

  const acceptMutation = useAcceptOffer();
  const cancelMutation = useCancelOffer();

  const handleOnClickSendOffer = () => {
    acceptMutation.mutate(message._id,{
      onSuccess: (res) => {
        if(res.success === true && res.statusCode === 202){
            setOfferMessage((prevMessage) => {
              if (prevMessage && prevMessage.offer) {
                return {
                  ...prevMessage,
                  offer: { ...prevMessage.offer, status: "ACCEPTED" }
                };
              }
              return prevMessage;
            });
        }
      },
      onError: (err) => {
        const e = err.response?.data as ApiError || err;
        if(e){
          console.log(e)
        }
      }
    })
  };

  const handleOnClickCancelOffer = () => {
    cancelMutation.mutate(offerMessage._id,{
      onSuccess: (res) => {
        console.log(res)
        if(res.success === true && res.statusCode === 202){
            setOfferMessage((prevMessage) => {
              if (prevMessage && prevMessage.offer) {
                return {
                  ...prevMessage,
                  offer: { ...prevMessage.offer, status: "CANCELLED" }
                };
              }
              return prevMessage;
            });
        }
      },
      onError: (err) => {
        const e = err.response?.data as ApiError || err;
        if(e){
          console.log(e)
        }
      }
    })
  };

  const handleClickOfferToggleModel = () => setMakeAnOffer(!makeAnOfferIsOpen);
  return (
    <>
      {makeAnOfferIsOpen && <MakeOfferModal product={selectedChat.product} isOpen={makeAnOfferIsOpen} onClose={handleClickOfferToggleModel}/>}
      <article className={styles.senderMessageBubble}>
        <div id="sender-message" className={styles.senderMessage}>
          <div className={styles.leftSection}>
            <img src={offerMessage.sender.avatar || userEmptyState} onError={ (e) => e.currentTarget.src = userEmptyState} alt={offerMessage.sender.fullname} />
          </div>

          <div className={styles.rightSection}>
            <div className={styles.tailinIcon}>
              <TailInIcon />
            </div>
            
            {offerMessage.offer?.status === "PENDING" && (
              <>
                <div id="offer" className={styles.offer}>
                    <span className={styles.offeredPrice}>$25.00</span>

                    {/* Original Price */}
                    <span className={styles.orginalPrice}>$30.00</span>            
                </div>

                <div id="top-section" className={styles.topSection}>
                  <button onClick={handleOnClickSendOffer}>Accept</button>
                </div>

                <div id="last-section" className={styles.lastSection}>
                  <button onClick={handleOnClickCancelOffer}>Decline</button>
                  <button onClick={handleClickOfferToggleModel}>Offer your price</button>
                </div>
              </>
            )}

            {offerMessage.offer?.status === "ACCEPTED" && (
              <>
                <div id="offer" className={styles.offer}>
                    <span className={styles.offeredPrice}>$25.00</span>
                    {/* Original Price */}
                    <span className={styles.orginalPrice}>$30.00</span>            
                </div>
                <span className={styles.status}>{offerMessage.offer.status.charAt(0).toUpperCase() + 
                offerMessage.offer.status.slice(1).toLowerCase()}</span>
              </>
            )}

            {offerMessage.offer?.status === "CANCELLED" && (
              <>
                <div id="offer" className={styles.offer}>
                    <span className={styles.offeredPrice}>$25.00</span>
                    {/* Original Price */}
                    <span className={styles.orginalPrice}>$30.00</span>            
                </div>
                <span className={styles.status}>{offerMessage.offer.status.charAt(0).toUpperCase() + 
                  offerMessage.offer.status.slice(1).toLowerCase()}</span>
                <div id="last-section" className={styles.cancelOfferlastSection}>
                  <button onClick={handleClickOfferToggleModel} className={styles.cancelledOfferBtn}>Offer your price</button>
                </div>
              </>
            )}

          </div>
        </div>
      </article>
    </>
  );
};

export default SenderMessageBubble;