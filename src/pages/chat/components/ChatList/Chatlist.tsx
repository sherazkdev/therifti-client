import React from 'react';
/** Types */
import type { ChatListPropsInterface } from './Chatlist.types';

/** Styles */
import styles from "./Chatlist.module.css";
import ChatlistTopHeader from './components/ChatListTopHeader/ChatlistTopHeader';
import ChatItem from './components/ChatItem/ChatItem';

const Chatlist:React.FC<ChatListPropsInterface> = ({onSelect}) => {

    return (
        <aside>
            <ChatlistTopHeader />
            <div onClick={onSelect} id="chats" className={styles.chats}>
                <ChatItem />
            </div>
        </aside>
    );
}

export default Chatlist;
