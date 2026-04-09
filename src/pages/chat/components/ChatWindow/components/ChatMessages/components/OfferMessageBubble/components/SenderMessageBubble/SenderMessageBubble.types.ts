import type { ChatDocumentInterface, MessageDocumentInterface } from "../../../../../../../../../../types/api";

/** Note: Sender Message Bubble Props Interface */
export interface SenderMessageBubblePropsInterface {
    message:MessageDocumentInterface,
    selectedChat:ChatDocumentInterface
};