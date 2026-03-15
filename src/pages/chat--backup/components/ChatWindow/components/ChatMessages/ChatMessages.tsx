import React, { useEffect, useState } from 'react';

/** Styles */
import styles from "./ChatMessages.module.css";
import type { ChatMessagePropsInterface, GroupedChatMessagesInterface } from './ChatMessages.types';
import MessageBubble from './components/MessageBubble/MessageBubble';
import type { MessageDocumentInterface } from '../../../../../../types/api';

/** Types */

const ChatMessages:React.FC<ChatMessagePropsInterface>  = ({chatMessages}) => {

    const [groupedChatMessages,setGroupedChatMessages] = useState<GroupedChatMessagesInterface[] | null>(null);

    /** Note: Group Messages */
    const getDateLabel = (createdAt: string) => {
        const messageDate = new Date(createdAt);
        const now = new Date();

        const diffMs = now.getTime() - messageDate.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";

        // Note: For last 7 days show weekday
        if (diffDays <= 7) {
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            return days[messageDate.getDay()];
        }

        if (diffDays <= 30) return "This month";

        return "Older";
    };

    const handleGroupMessagesByDate = (messages: MessageDocumentInterface[]) => {
        const groups: Record<string, MessageDocumentInterface[]> = {};

        messages.forEach(msg => {
            const label = getDateLabel(msg.createdAt.toString());
            if (!groups[label]) groups[label] = [];
            groups[label].push(msg);
        });

        return Object.entries(groups).map(([dateLabel, msgs]) => ({
            dateLabel,
            messages: msgs
        }));
    };

    useEffect( () => {
        if(chatMessages && chatMessages?.length > 0){
            const groupedMessages = handleGroupMessagesByDate(chatMessages);
            setGroupedChatMessages(groupedMessages)
        }
    },[chatMessages])
    return (
        <div id='chat-messages' className={styles.chatMessages}>
            
            {Array.isArray(groupedChatMessages) && groupedChatMessages.length > 0 && groupedChatMessages.map( (grouped) => (
                <div id="date-group" className={styles.dateGroup}>
                    
                    <div id="date-header" className={styles.dateHeader}>
                        <span>{grouped.dateLabel}</span>
                    </div>
                    <div id="messages" className={styles.messages}>
                        {grouped.messages.map( (message) => (
                            <MessageBubble message={message} key={message._id}/>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ChatMessages;
