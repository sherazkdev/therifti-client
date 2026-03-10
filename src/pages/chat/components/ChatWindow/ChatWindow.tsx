import { type FC } from "react";

/** Types */
import type { ChatWindowPropsInterface } from "./ChatWindow.types";

/** Styles */
import styles from "./ChatWindow.module.css";
import ChatMessages from "./components/ChatMessages/ChatMessages";
import ChatWindowFooter from "./components/ChatWindowFooter/ChatWindowFooter";
import ChatWindowTopHeader from "./components/ChatWindowTopHeader/ChatWindowTopHeader";

const ChatWindow:FC<ChatWindowPropsInterface> = ({onBack}) => {
    return (
        <>
            <main className={styles.chatWindow}>
                <ChatWindowTopHeader onBack={onBack}/>
                <ChatMessages />
                <ChatWindowFooter />
            </main>
        </>
    )
};

export default ChatWindow;