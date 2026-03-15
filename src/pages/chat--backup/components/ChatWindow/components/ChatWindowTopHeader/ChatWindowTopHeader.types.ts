import type { ChatDocumentInterface } from "../../../../../../types/api";

/** Note: Chat Window Top header Props Interface */
export interface ChatWindowTopHeaderPropsInterface {
    onBack: () => void,
    selectedChat:ChatDocumentInterface | null
}