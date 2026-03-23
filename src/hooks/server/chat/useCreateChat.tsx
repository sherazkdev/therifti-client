import type { CreateChatApiResponse, CreateChatInterface } from "../../../types/api";
import { useMutation } from "@tanstack/react-query";

/** Services */
import ChatApi from "../../../api/chat.api";
import BackendRequestServices from "../../../services/backendRequest.services";
import type { AxiosError } from "axios";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const backendRequestServices = new BackendRequestServices(BaseURL);
const chatApi = new ChatApi(backendRequestServices);

const useCreateChat = () => {
    return useMutation<CreateChatApiResponse,AxiosError,CreateChatInterface>({
        mutationFn:(chatObj:CreateChatInterface) => chatApi.CreateChat(chatObj),
    });
};
export default useCreateChat;