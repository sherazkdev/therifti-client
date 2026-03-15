import type { ChatDocumentInterface } from "../../../../../../types/api";
import type { WindowTabsInterface } from "../../ChatWindow.types";

/** Note: Coverzation Details Props Interface */
export interface CoverzationDetailsPropsInterface {
    handleToggleWindowSection:(window:WindowTabsInterface) => void,
    selectedChat:ChatDocumentInterface | null
}