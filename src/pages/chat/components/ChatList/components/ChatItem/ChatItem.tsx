import React from 'react';

/** Types */
import type { ChatItemPropsInterface } from './Chat.types';

/** Styles */
import styles from "./ChatItem.module.css";
import userEmtyState from "../../../../../../assets/icons/user-empty-state.svg"
import isOnline from "../../../../../../assets/icons/pngs/online.png";

import { useSockets } from '../../../../../../contexts/sockets/socket.context';

const ChatItem:React.FC<ChatItemPropsInterface> = ({chat,onSelect,selectedChat}) => {

    const {onlineUsers} = useSockets();

    const timeAgo = (date:Date) => {
        const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
        const intervals = [
            { label: "year", seconds: 31536000 },
            { label: "month", seconds: 2592000 },
            { label: "day", seconds: 86400 },
            { label: "hour", seconds: 3600 },
            { label: "minute", seconds: 60 },
            { label: "second", seconds: 1 },
        ];

        for(let i of intervals){
            const count = Math.floor( seconds / i.seconds );
            if(count >= 1){
                return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
            }

            return "just now";
        }
    };
    return (
        <>
            <article onClick={ () => onSelect(chat)}  className={`${styles.chatItem} ${selectedChat && selectedChat._id === chat._id && styles.active} `}>

                    {/* avatar */}
                    <div id="left-section" className={styles.leftSection}>
                        <img className={styles.avatar} src={chat.member?.avatar || userEmtyState} onError={ (e) => e.currentTarget.src = userEmtyState } loading='lazy'/>
                        {chat && onlineUsers && onlineUsers[chat.member._id] && (
                            <span id="isOnline" className={styles.isOnline}>
                                <img src={isOnline} loading='lazy'/>
                            </span>
                        )}
                    </div>
                    
                    <div id="right-section" className={styles.rightSection}>
                        <div id="top-section" className={styles.topSection}>
                            <span id='member-name' className={styles.memberName}>{chat.member?.fullname}</span>
                            <span id='last-message-data' className={styles.lastMessageTime}>{timeAgo(chat.lastMessage?.createdAt as Date)}</span>
                        </div>
                        <div id="bottom-section" className={styles.bottomSection}>
                            <span id='message' className={styles.messageContent}>
                                <span className={styles.messageContent}>{chat.lastMessage?.content}</span>
                                {/* <span className={styles.unreadMessageLenght}>1</span> */}
                            </span>
                        </div>
                    </div>
            </article>
        </>
    );
}

export default ChatItem;