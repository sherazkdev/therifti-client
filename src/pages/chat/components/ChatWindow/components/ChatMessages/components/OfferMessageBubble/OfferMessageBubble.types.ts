import type { ChatDocumentInterface, MessageDocumentInterface } from "../../../../../../../../types/api";

/** Note: Components Type */
export interface OfferMessageBubblePropsInterface {
    message:MessageDocumentInterface,
    selectedChat:ChatDocumentInterface
}