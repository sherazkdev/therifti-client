import React, { useEffect, useState } from 'react';

/** Types */
import type { ChatListPropsInterface } from './Chatlist.types';
import type { ChatDocumentInterface } from '../../../../types/api';

/** Styles */
import styles from "./Chatlist.module.css";
import ChatlistTopHeader from './components/ChatListTopHeader/ChatlistTopHeader';
import ChatItem from './components/ChatItem/ChatItem';

/** Hooks */
import useChats from '../../../../hooks/server/chat/useChats';

const Chatlist:React.FC<ChatListPropsInterface> = ({onSelect,selectedChat}) => {

    const [chats,setChats] = useState<ChatDocumentInterface[] | null>(null);

    const {data,isLoading} = useChats();

    /** Note: Munt to fetched chats */
    useEffect( () => {
        /** Note: Fetched Chats FC */
        if(data && data?.data.length > 0){
            console.log(data)
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
    }

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
