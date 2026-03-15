import { useEffect, useState} from "react";

/** Note: Socket Provider */
import {useSockets} from "../../../contexts/sockets/socket.context";
import type { MessageDocumentInterface } from "../../../types/api";

const useEvents = () => {

    const [newMessage,setNewMessage] = useState<MessageDocumentInterface | null>(null);

    const {socket} = useSockets();


    /** Note: Socket events emit returners */
    useEffect( () => {
        if(!socket){
            return;
        };

        socket.on("event:message",(message:MessageDocumentInterface) => {
            setNewMessage(message);
        });

    }, [socket]);

    /** Note: Socket.io events */
    const joinChatRoom = (chatId:string) => socket?.emit("join-chat-room",chatId);
    const leaveChatRoom = (chatId:string) => socket?.emit("leave-chat-room",chatId);
    const getOnlineUsers = () => socket?.emit("online-users");

    return {
        joinChatRoom,
        leaveChatRoom,
        newMessage,
        getOnlineUsers
    }
};

export default useEvents;