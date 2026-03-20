import React, { useContext, useEffect, useState } from 'react';

/** Components */
import styles from "./chat.module.css";
import Chatlist from './components/ChatList/Chatlist';
import ChatWindow from './components/ChatWindow/ChatWindow';

/** Types */
import type { MessageDocumentInterface, ChatDocumentInterface, SendMessageInterface } from '../../types/api';

/** Note: Hooks */
import useEvents from '../../hooks/server/socket/useEvents';
import useSendMessage from '../../hooks/server/message/useSendMessage';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth/auth.context';

const Chat = () => {

    const [selectedChat,setSelectChat] = useState<ChatDocumentInterface | null>(null);
    const [chats,setChats] = useState<ChatDocumentInterface[] | null>(null);
    const [chatMessages,setChatMessages] = useState<MessageDocumentInterface[] | null>(null);

    const {joinChatRoom,leaveChatRoom,newMessage,getOnlineUsers} = useEvents();
    const messageMutation = useSendMessage();
    const {user} = useContext(AuthContext);

    const Redirect = useNavigate();

    /** Note: Handle Select Chat */
    const handleOnSelectChat = (chat:ChatDocumentInterface) => {
        joinChatRoom(chat._id);
        Redirect(`/inbox/${chat?._id}`,{replace:false})
        setSelectChat(chat)
    };

    /** Note: Handle On Back Chat */
    const handleOnBackChat = () => {
        if(!selectedChat) return;
        leaveChatRoom(selectedChat?._id);
        setSelectChat(null)
        setChatMessages([]);
        Redirect(`/inbox`)
    };

    useEffect( () => {
        if(newMessage !== null){
            setChatMessages( (prevMessages) => {
                const matchedIndex = prevMessages?.findIndex( (m) => (
                    m.chatId === newMessage.chatId && m.status === "PENDING" && m.sender?._id === newMessage.sender?._id
                ));
                /** Note: Replace Matched Index message */
                const updated = [...prevMessages || []];
                if(matchedIndex === -1){
                    updated.push(newMessage);
                }else if(matchedIndex === 0){
                    updated[matchedIndex] = newMessage;
                };
                return updated;
            })
        }
    },[newMessage]);

    /** Note: Handle Send Message */
    const handleSendMessage = (content:string) => {
        try {
            const sendMessagePayload:SendMessageInterface = {
                content,
                chatId:selectedChat?._id as string,
                receiverId:selectedChat?.member._id as string
            };
            messageMutation.mutate(sendMessagePayload);

            /** Note: For Ui */
            const uiMessageDoc:MessageDocumentInterface = {
                _id:"112",
                content:content,
                chatId:selectedChat?._id as string,
                sender:{
                    _id:user?._id as string,
                    avatar:user?.avatar as string,
                    fullname:user?.fullname as string
                },
                status:"PENDING",
                createdAt:new Date()
            };
            setChatMessages( (prevChatMessages) => [...prevChatMessages || [],uiMessageDoc])
        } catch (e) {
            console.log(e);
        }
    };

    const handleSetChatMessages = (messages:any) => setChatMessages(messages as MessageDocumentInterface[]);
    return (
        <>
            <section id='main-layout' className={`${styles.chatLayout} ${selectedChat ? "showChat" : ""}`}>
                <Chatlist onSelect={handleOnSelectChat} selectedChat={selectedChat} chats={chats} setChats={setChats}/>
                <ChatWindow onBack={handleOnBackChat} selectedChat={selectedChat} chats={chats} chatMessages={chatMessages} handleSetChatMessages={handleSetChatMessages} handleSendMessage={handleSendMessage}/>
            </section>            
        </>
    )
}

export default Chat;
