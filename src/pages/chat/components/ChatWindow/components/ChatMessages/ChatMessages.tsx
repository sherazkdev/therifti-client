import React from 'react';

/** Styles */
import styles from "./ChatMessages.module.css";
import type { ChatMessagePropsInterface } from './ChatMessages.types';
import MessageBubble from './components/MessageBubble/MessageBubble';

/** Types */

const ChatMessages:React.FC<ChatMessagePropsInterface>  = () => {
    return (
        <div id='chat-messages' className={styles.chatMessages}>
            
            <div id="date-group" className={styles.dateGroup}>
                
                <div id="date-header" className={styles.dateHeader}>
                    <span>2 month ago</span>
                </div>
                <div id="messages">
                    <MessageBubble />
                </div>
            </div>

        </div>
    );
}

export default ChatMessages;
