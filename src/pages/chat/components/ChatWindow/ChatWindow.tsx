import { useEffect, type FC, useContext, useState } from "react";

/** Types */
import type { WindowTabsInterface, ChatWindowPropsInterface } from "./ChatWindow.types";

/** Styles */
import styles from "./ChatWindow.module.css";
import ChatMessages from "./components/ChatMessages/ChatMessages";
import ChatWindowFooter from "./components/ChatWindowFooter/ChatWindowFooter";
import ChatWindowTopHeader from "./components/ChatWindowTopHeader/ChatWindowTopHeader";

/** Note: Hooks */
import useGetChatMessages from "../../../../hooks/server/message/useChatMessages";

import type { ApiError } from "../../../../types/api";
import EmptyChat from "../ChatList/components/EmptyChat/EmptyChat";
import CoverzationDetails from "./components/CoverzationDetails/CoverzationDetails";

const ChatWindow:FC<ChatWindowPropsInterface> = ({onBack,selectedChat, handleSetChatMessages, chatMessages, handleSendMessage}) => {

    const [windowTab,setWindowTab] = useState<WindowTabsInterface>("COVERZATION_MESSAGES");
    
    /** Note: Hooks */
    const { data, error, isLoading, refetch} = useGetChatMessages(selectedChat?._id);

    /** Note: Fetched Chat Message assign to the constant */
    useEffect( () => {
        if(Array.isArray(data?.data) && data.data?.length > 0){
            handleSetChatMessages(data.data);
        }
    },[data]);

    /** Note: SelectedChat changed to fetched selected chat messages */
    useEffect( () => {  
        if (!selectedChat) {
            handleSetChatMessages([]); 
            return;
        }
        if(selectedChat !== null){
            refetch();
        }
    },[selectedChat])

    /* Note: Error Handling */
    useEffect( () => {
        if(error){
            const err = error.response?.data as ApiError || undefined;
            if(err) console.log(err)
        }
    },[error]);

    const handleToggleWindowSection = (window:WindowTabsInterface) => setWindowTab(window);
    return (
        <>

            <main className={styles.chatWindow}>
                {windowTab === "COVERZATION_MESSAGES" && (
                    <>
                        {isLoading && (
                            <div id="loaderMain" className={styles.loaderMain}>
                            <div className="mediumLoader"></div>
                            </div>
                        )}

                        {!isLoading && chatMessages && chatMessages.length > 0 && (
                            <>
                                <ChatWindowTopHeader onBack={onBack} selectedChat={selectedChat} handleToggleWindowSection={handleToggleWindowSection} />
                                <ChatMessages chatMessages={chatMessages}/>
                                <ChatWindowFooter handleSendMessage={handleSendMessage} />
                            </>
                        )}

                        {!selectedChat && !isLoading && (!chatMessages || chatMessages.length === 0) && (
                            <EmptyChat />
                        )}
                    </>
                )}

                {windowTab === "COVERZATION_DETAILS" && (
                    <CoverzationDetails handleToggleWindowSection={handleToggleWindowSection} selectedChat={selectedChat} />
                )}
            </main>

        </>
    )
};

export default ChatWindow;