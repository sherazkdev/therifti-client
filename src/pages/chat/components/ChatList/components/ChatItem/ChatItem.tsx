import React from 'react';

/** Types */
import type { ChatItemPropsInterface } from './Chat.types';

/** Styles */
import styles from "./ChatItem.module.css";

const ChatItem:React.FC<ChatItemPropsInterface> = () => {
    return (
        <>

            {[0,1,2,4,6,7,8,9,12,2,3].map( (i) => (
                <article key={i} className={`${styles.chatItem} ${ i === 2 && styles.active}`}>

                    {/* avatar */}
                    <div id="left-section">
                        <img className={styles.avatar} src='https://static.vinted.com/assets/no-photo/user-clothing/system-photo/default.png' loading='lazy'/>
                        <span id="isOnline"></span>
                    </div>
                    
                    <div id="right-section" className={styles.rightSection}>
                        <div id="top-section" className={styles.topSection}>
                            <span id='member-name' className={styles.memberName}>Vinted Team</span>
                            <span id='last-message-data' className={styles.lastMessageTime}>14 hours ago</span>
                        </div>
                        <div id="bottom-section" className={styles.bottomSection}>
                            <span id='message' className={styles.messageContent}>
                                Hi I can see these still have not welcome
                            </span>
                        </div>
                    </div>
                </article>
            ))}
        </>
    );
}

export default ChatItem;