import React from 'react';

/** Styles */
import styles from "./EmptyChat.module.css";

/** Note: Animated Gifs */
import PaperGifPlane from "../../../../../../assets/icons/gifs/icons-paper-plane.gif"
const EmptyChat = () => {
    return (
        <article className={styles.emptyChatMain}>
            <span>
                <img src={PaperGifPlane} alt="No messages yet" />
            </span>
            <span>No messages yet</span>
            <span className={styles.messageEmtyChat}>When someone sends a message to you, it will appear here</span>
        </article>
    );
}

export default EmptyChat;
