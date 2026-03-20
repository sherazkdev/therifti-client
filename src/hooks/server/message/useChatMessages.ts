import { useQuery } from "@tanstack/react-query";

/** Note: Services */
import BackendRequestServices from "../../../services/backendRequest.services";
import MessageApi from "../../../api/message.api";

/** Note: Types */
import type { GetChatsMessagesApiResponse } from "../../../types/api";
import env from "../../../constants/loadEnv/loadEnv";
import type { AxiosError } from "axios";

const BaseURL = env.SERVER_URL;
const backendRequestServices = new BackendRequestServices(BaseURL);
const messageApi = new MessageApi(backendRequestServices);

const useGetChatMessages = (chatId:any) => {
    return useQuery<GetChatsMessagesApiResponse,AxiosError>({
        queryKey:["chatMessages",chatId],
        queryFn: () => messageApi.GetChatMessages(chatId),
        enabled:!!chatId
    });
};

export default useGetChatMessages;