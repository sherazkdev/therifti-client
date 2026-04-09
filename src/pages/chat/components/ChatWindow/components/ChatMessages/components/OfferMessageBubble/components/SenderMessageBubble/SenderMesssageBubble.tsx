import React, { useState } from "react";
import type { SenderMessageBubblePropsInterface } from "./SenderMessageBubble.types";
import { TailInIcon } from "../../../../../../../../../../assets/icons/svgs/svg";
import styles from "./SenderMessageBubble.module.css";

import useAcceptOffer from "../../../../../../../../../../hooks/server/message/useAcceptOffer";
import useCancelOffer from "../../../../../../../../../../hooks/server/message/useCancelOffer";
import type { ApiError } from "../../../../../../../../../../types/api";

import MakeOfferModal from "../../../../../../../../../SingleProduct/components/MakeOfferModal/MakeOfferModal";

const SenderMessageBubble: React.FC<SenderMessageBubblePropsInterface> = ({ message,selectedChat }) => {
  const [makeAnOfferIsOpen,setMakeAnOffer] = useState<boolean>(false);

  const acceptMutation = useAcceptOffer();
  const cancelMutation = useCancelOffer();

  const handleOnClickSendOffer = () => {
    acceptMutation.mutate(message._id,{
      onSuccess: (res) => console.log(res),
      onError: (err) => {
        const e = err.response?.data as ApiError || err;
        if(e){
          console.log(e)
        }
      }
    })
  };

  const handleOnClickCancelOffer = () => {};

  const handleClickOfferToggleModel = () => setMakeAnOffer(!makeAnOfferIsOpen);
  return (
    <>
      {makeAnOfferIsOpen && <MakeOfferModal product={selectedChat.product} isOpen={makeAnOfferIsOpen} onClose={handleClickOfferToggleModel}/>}
      <article className={styles.senderMessageBubble}>
        <div id="sender-message" className={styles.senderMessage}>
          <div className={styles.leftSection}>
            <img src={message.sender.avatar} alt={message.sender.fullname} />
          </div>

          <div className={styles.rightSection}>
            <div className={styles.tailinIcon}>
              <TailInIcon />
            </div>
            
            {message.offer?.status === "PENDING" && (
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
                  <button>Decline</button>
                  <button onClick={handleClickOfferToggleModel}>Offer your price</button>
                </div>
              </>
            )}

            {message.offer?.status === "ACCEPTED" && (
              <>
                <div id="offer" className={styles.offer}>
                    <span className={styles.offeredPrice}>$25.00</span>
                    {/* Original Price */}
                    <span className={styles.orginalPrice}>$30.00</span>            
                </div>
                <span className={styles.status}>{message.offer.status.charAt(0).toUpperCase() + 
                message.offer.status.slice(1).toLowerCase()}</span>
              </>
            )}

          </div>
        </div>
      </article>
    </>
  );
};

export default SenderMessageBubble;