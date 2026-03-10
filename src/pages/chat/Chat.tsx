import React, { useState } from 'react';

import styles from "./chat.module.css";
import Chatlist from './components/ChatList/Chatlist';
import ChatWindow from './components/ChatWindow/ChatWindow';

/** Components */

const Chat = () => {

    const [selectedChat,setSelectChat] = useState<boolean>(false);

    return (
        <>
            <section id='main-layout' className={`${styles.chatLayout} ${selectedChat ? "showChat" : ""}`}>
                <Chatlist onSelect={ () => setSelectChat(true)}/>
                <ChatWindow onBack={ () => setSelectChat(false)} />
            </section>            
        </>
    )
}

export default Chat;
