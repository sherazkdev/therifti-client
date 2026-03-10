import React from 'react';

/** Types */
import type { ChatWindowFooterPropsInterface } from './ChatWindowFooter.types';

/** Styles */
import styles from "./ChatWindowFooter.module.css";
import { PlusIcon, SendHorizontalIcon } from 'lucide-react';

const ChatWindowFooter:React.FC<ChatWindowFooterPropsInterface> = () => {
    return (
        <footer className={styles.footer}>
            <span><PlusIcon color='#15191a'/></span>
            <div id="send-message-input" className={styles.sendMessageInputDev}>
                <input type="text" className={styles.sendMessageInput} placeholder='Write a message here' />
                <button className={styles.sendBtn}><SendHorizontalIcon color='#15191a' /></button>
            </div>
        </footer>
    );
}   

export default ChatWindowFooter;
