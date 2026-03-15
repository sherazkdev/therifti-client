import type { MessageDocumentInterface } from "../../../../../../types/api";

/** Note: Chat Messages Props Interface */
export interface ChatMessagePropsInterface {
    chatMessages:MessageDocumentInterface[] | null
};

/** Note: Grouped Messages Interface */
export interface GroupedChatMessagesInterface {
    dateLabel:string,
    messages:MessageDocumentInterface[]
}