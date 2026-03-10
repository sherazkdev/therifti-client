import React from 'react';

/** Styles */
import styles from "./MessageBubble.module.css";

/** Types */
import type { MessageBubblePropsInterface } from './MessageBubble.types';

const MessageBubble:React.FC<MessageBubblePropsInterface> = () => {
    return (
        <>
            {/* Your message */}
            <article className={styles.myMessageArtice}>
                <div id="message" className={styles.mymessage}>
                    <span className={styles.yourtailOutIcon}>
                        <svg viewBox="0 0 8 13" height="13" color='#edf2f2' width="8" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><title>tail-out</title><path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path><path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path></svg>
                    </span>
                    <div id="content" className={styles.yourMessage}>Hi, Sheraz</div>
                </div>
            </article>
            {/* Sender Message */}
            <article className={styles.senderMessageArtice}>
                <div id="avatar" className={styles.avatar}>
                    <img src="https://media-sin6-1.cdn.whatsapp.net/v/t61.24694-24/328694864_1510658222849575_1152769974409459200_n.jpg?stp=dst-jpg_s96x96_tt6&ccb=11-4&oh=01_Q5Aa4AEKpPQsv6tXOshxoh4utRa69ihbWJIJo69RIFWsmvQSvA&oe=69BD8158&_nc_sid=5e03e0&_nc_cat=110" alt="" loading='lazy' />
                </div>
                <div id="message" className={styles.sendermessage}>
                    <span className={styles.sendertailOutIcon}>
                        <svg viewBox="0 0 8 13" height="13" color='#edf2f2' width="8" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><title>tail-in</title><path opacity="0.13" fill="#0000000" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path><path fill="currentColor" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path></svg>
                    </span>
                    <div id="content" className={styles.senderMessage}>Connect, collaborate, and celebrate from anywhere with</div>
                </div>
            </article>
        </>
    );
}

export default MessageBubble;
