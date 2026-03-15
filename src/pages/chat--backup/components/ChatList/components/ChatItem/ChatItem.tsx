import React from 'react';

/** Types */
import type { ChatItemPropsInterface } from './Chat.types';

/** Styles */
import styles from "./ChatItem.module.css";
import userEmtyState from "../../../../../../assets/icons/user-empty-state.svg"

const ChatItem:React.FC<ChatItemPropsInterface> = ({chat,onSelect,selectedChat}) => {

    console.log(selectedChat,"Selected")

    return (
        <>
            <article onClick={ () => onSelect(chat)}  className={`${styles.chatItem} ${selectedChat && selectedChat._id === chat._id && styles.active} `}>

                    {/* avatar */}
                    <div id="left-section">
                        <img className={styles.avatar} src={chat.member?.avatar || userEmtyState} onError={ (e) => e.currentTarget.src = userEmtyState } loading='lazy'/>
                        <span id="isOnline"></span>
                    </div>
                    
                    <div id="right-section" className={styles.rightSection}>
                        <div id="top-section" className={styles.topSection}>
                            <span id='member-name' className={styles.memberName}>{chat.member?.fullname}</span>
                            <span id='last-message-data' className={styles.lastMessageTime}>14 hours ago</span>
                        </div>
                        <div id="bottom-section" className={styles.bottomSection}>
                            <span id='message' className={styles.messageContent}>
                                Hi I can see these still have not welcome
                            </span>
                        </div>
                    </div>
            </article>
        </>
    );
}

export default ChatItem;