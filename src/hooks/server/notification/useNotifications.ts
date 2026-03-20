import type { GetNotificationApiResponse } from "../../../types/api/index";
import { useMutation } from "@tanstack/react-query";

/** Services */
import NotificationApi from "../../../api/notification.api";
import BackendRequestServices from "../../../services/backendRequest.services";
import type { AxiosError } from "axios";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const backendRequestServices = new BackendRequestServices(BaseURL);
const notificationApi = new NotificationApi(backendRequestServices);

const useNotifications = () => {
    return useMutation<GetNotificationApiResponse,AxiosError>({
        mutationFn: () => notificationApi.GetNotifications(),
    })
};
export default useNotifications;