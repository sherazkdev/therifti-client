import type { ChatDocumentInterface } from "../../../../../../types/api";
import type { WindowTabsInterface } from "../../ChatWindow.types";

/** Note: Chat Window Top header Props Interface */
export interface ChatWindowTopHeaderPropsInterface {
    onBack: () => void,
    selectedChat:ChatDocumentInterface | null,
    handleToggleWindowSection:(window:WindowTabsInterface) => void
}