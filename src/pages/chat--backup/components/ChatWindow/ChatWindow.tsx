import { useEffect, useState, type FC } from "react";

/** Types */
import type { ChatWindowPropsInterface } from "./ChatWindow.types";

/** Styles */
import styles from "./ChatWindow.module.css";
import ChatMessages from "./components/ChatMessages/ChatMessages";
import ChatWindowFooter from "./components/ChatWindowFooter/ChatWindowFooter";
import ChatWindowTopHeader from "./components/ChatWindowTopHeader/ChatWindowTopHeader";

/** Note: Hooks */
import useGetChatMessages from "../../../../hooks/server/message/useChatMessages";
import useSendMessage from "../../../../hooks/server/message/useSendMessage";

import type { MessageDocumentInterface, ApiError, SendMessageInterface } from "../../../../types/api";

const ChatWindow:FC<ChatWindowPropsInterface> = ({onBack,selectedChat}) => {
    const [chatMessages,setChatMessages] = useState<MessageDocumentInterface[] | null>(null);

    const {data,error,isLoading} = useGetChatMessages(selectedChat?._id);
    const messageMutation = useSendMessage();

    useEffect( () => {
        if(Array.isArray(data?.data) && data.data?.length > 0){
            setChatMessages(data.data);
        }
    },[data]);

    useEffect( () => {
        if(error){
            const err = error.response?.data as ApiError || undefined;
            if(err) console.log(err)
        }
    },[error]);

    /** Note: Handle Send Message */
    const handleSendMessage = (content:string) => {
        try {
            const sendMessagePayload:SendMessageInterface = {
                content,
                chatId:selectedChat?._id as string,
                receiverId:selectedChat?.member._id as string
            };
            messageMutation.mutate(sendMessagePayload);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <>

            <main className={styles.chatWindow}>
                {isLoading ? (
                    <div id="loaderMain" className={styles.loaderMain}>
                        <div className="mediumLoader"></div>
                    </div>
                ) : (
                    <>
                        <ChatWindowTopHeader onBack={onBack} selectedChat={selectedChat}/>
                        <ChatMessages chatMessages={chatMessages}/>
                        <ChatWindowFooter handleSendMessage={handleSendMessage} />
                    </>
                )}
            </main>
        </>
    )
};

export default ChatWindow;