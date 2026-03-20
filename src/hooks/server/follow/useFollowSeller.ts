import type { FollowSellerApiResponse } from "../../../types/api/index";
import { useMutation } from "@tanstack/react-query";

/** Services */
import FollowApi from "../../../api/follow.api";
import BackendRequestServices from "../../../services/backendRequest.services";
import type { AxiosError } from "axios";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const backendRequestServices = new BackendRequestServices(BaseURL);
const followApi = new FollowApi(backendRequestServices);

const useFollowSeller = () => {
    return useMutation<FollowSellerApiResponse,AxiosError,string>({
        mutationFn: (followerId:string) => followApi.FollowSeller(followerId),
    })
};
export default useFollowSeller;