import type { ChatDocumentInterface } from "../../../../types/api";

export interface ChatWindowPropsInterface {
/** Note: Chat Window Props Interface */
    onBack: () => void,
    selectedChat:ChatDocumentInterface | null
}