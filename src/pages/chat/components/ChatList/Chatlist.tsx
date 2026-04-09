import React, { useEffect, useState } from 'react';

import { useLocation, useParams } from 'react-router-dom';

/** Types */
import type { ChatListPropsInterface } from './Chatlist.types';
import type { ApiError, ChatDocumentInterface } from '../../../../types/api';

/** Styles */
import styles from "./Chatlist.module.css";
import ChatlistTopHeader from './components/ChatListTopHeader/ChatlistTopHeader';
import ChatItem from './components/ChatItem/ChatItem';

/** Hooks */
import useChats from '../../../../hooks/server/chat/useChats';

const Chatlist:React.FC<ChatListPropsInterface> = ({onSelect,selectedChat,chats,setChats}) => {

    const {data,isLoading,error} = useChats();

    const {chatId} = useParams();

    useEffect( () => {
        if(chatId){
            if(Array.isArray(chats) && chats.length > 0){
                const findIndex = chats && chats?.findIndex( (c) => c._id === chatId);
                if(findIndex === -1){
                    onSelect(chats[0])
                    return;
                }
                onSelect(chats[findIndex]);
            }
        }else if(Array.isArray(chats) && chats.length && !chatId){
            onSelect(chats[0])
        }
    },[chats])

    /** Note: Munt to fetched chats */
    useEffect( () => {
        /** Note: Fetched Chats FC */
        if(data && data?.data.length > 0){
            console.log(data.data)
            setChats(data?.data);
        }
    },[data]);

    /** Note: Handle Search Chat */
    const handleSearchChat = (q:string) => {
        
        if(!data?.data) return;

        const filtered = data.data.filter((chat: ChatDocumentInterface) =>
            chat.member.fullname?.toLowerCase().includes(q.toLowerCase())
        );

        setChats(filtered);
    };

    /* Note: Error Handling */
    useEffect( () => {
        if(error){
            console.log(error)
            const err = error.response?.data as ApiError || undefined;
            if(err) console.log(err)
        }
    },[error]);
    return (
        <aside>
            
            <ChatlistTopHeader handleSearchChat={handleSearchChat} />
            <div id="chats" className={styles.chats}>
                {!isLoading && chats && chats.map( (chat) => <ChatItem chat={chat} onSelect={onSelect} key={chat._id} selectedChat={selectedChat} />)}
            </div>
        </aside>
    );
}

export default Chatlist;
