import type { ChatDocumentInterface } from "../../../../../../types/api";

/** Note: Chat Props Interface */
export interface ChatItemPropsInterface {
    chat:ChatDocumentInterface,
    onSelect:(chat:any) => void,
    selectedChat:ChatDocumentInterface | null
}