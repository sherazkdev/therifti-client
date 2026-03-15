import React, { useState } from 'react';

/** Components */
import styles from "./chat.module.css";
import Chatlist from './components/ChatList/Chatlist';
import ChatWindow from './components/ChatWindow/ChatWindow';

/** Types */
import type { ChatDocumentInterface } from '../../types/api';

/** Note: Hooks */
import useEvents from '../../hooks/server/socket/useEvents';

const Chat = () => {

    const [selectedChat,setSelectChat] = useState<ChatDocumentInterface | null>(null);

    const {joinChatRoom,leaveChatRoom} = useEvents();

    /** Note: Handle Select Chat */
    const handleOnSelectChat = (chat:ChatDocumentInterface) => {
        joinChatRoom(chat._id);
        setSelectChat(chat)
    };

    /** Note: Handle On Back Chat */
    const handleOnBackChat = () => {
        if(!selectedChat) return;
        leaveChatRoom(selectedChat?._id);
        setSelectChat(null)
    };
    return (
        <>
            <section id='main-layout' className={`${styles.chatLayout} ${selectedChat ? "showChat" : ""}`}>
                <Chatlist onSelect={handleOnSelectChat} selectedChat={selectedChat}/>
                <ChatWindow onBack={handleOnBackChat} selectedChat={selectedChat} />
            </section>            
        </>
    )
}

export default Chat;
