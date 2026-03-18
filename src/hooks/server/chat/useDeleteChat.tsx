import type { DeleteChatApiResponse } from "../../../types/api";
import { useMutation } from "@tanstack/react-query";

/** Services */
import ChatApi from "../../../api/chat.api";
import BackendRequestServices from "../../../services/backendRequest.services";
import type { AxiosError } from "axios";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const backendRequestServices = new BackendRequestServices(BaseURL);
const chatApi = new ChatApi(backendRequestServices);

const useDeleteChat = () => {
    return useMutation<DeleteChatApiResponse,AxiosError,string>({
        mutationFn:(chatId:string) => chatApi.DeleteChat(chatId),
    });
};
export default useDeleteChat;