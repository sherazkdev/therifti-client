import type { GetChatsApiResponse } from "../../../types/api";
import { useQuery } from "@tanstack/react-query";

/** Services */
import ChatApi from "../../../api/chat.api";
import BackendRequestServices from "../../../services/backendRequest.services";
import type { AxiosError } from "axios";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const backendRequestServices = new BackendRequestServices(BaseURL);
const chatApi = new ChatApi(backendRequestServices);

const useChats = () => {
    return useQuery<GetChatsApiResponse,AxiosError>({
        queryKey:["chats"],
        queryFn: () => chatApi.GetChats(),
        enabled:true
    });
};
export default useChats;