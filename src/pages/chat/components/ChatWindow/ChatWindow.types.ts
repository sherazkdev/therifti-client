import type { ChatDocumentInterface, MessageDocumentInterface } from "../../../../types/api";

export interface ChatWindowPropsInterface {
/** Note: Chat Window Props Interface */
    onBack: () => void,
    selectedChat:ChatDocumentInterface | null,
    chatMessages:MessageDocumentInterface[] | null,
    handleSetChatMessages:(messages:any) => void,
    handleSendMessage:(content:string) => void,
    chats:ChatDocumentInterface[] | null
};

export type WindowTabsInterface = "COVERZATION_DETAILS" | "COVERZATION_MESSAGES";