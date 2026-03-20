import { useMutation } from "@tanstack/react-query";

/** Note: Services */
import BackendRequestServices from "../../../services/backendRequest.services";
import MessageApi from "../../../api/message.api";

/** Note: Types */
import type { SendMessageApiResponse, SendMessageInterface } from "../../../types/api";
import env from "../../../constants/loadEnv/loadEnv";
import type { AxiosError } from "axios";

const BaseURL = env.SERVER_URL;
const backendRequestServices = new BackendRequestServices(BaseURL);
const messageApi = new MessageApi(backendRequestServices);

const useSendMessage = () => {
    return useMutation<SendMessageApiResponse,AxiosError,SendMessageInterface>({
        mutationFn: (messageObj:SendMessageInterface) => messageApi.SendMessage(messageObj)
    });
};

export default useSendMessage;