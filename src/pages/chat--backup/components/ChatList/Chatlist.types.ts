import type { ChatDocumentInterface } from "../../../../types/api";

/** Note: Chat List Props Interface */
export interface ChatListPropsInterface {
    onSelect: (chat:any) => void,
    selectedChat:ChatDocumentInterface | null
}