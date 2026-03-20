import type { UnfollowSellerApiResponse } from "../../../types/api/index";
import { useMutation } from "@tanstack/react-query";

/** Services */
import FollowApi from "../../../api/follow.api";
import BackendRequestServices from "../../../services/backendRequest.services";
import type { AxiosError } from "axios";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const backendRequestServices = new BackendRequestServices(BaseURL);
const followApi = new FollowApi(backendRequestServices);

const useUnfollowSeller = () => {
    return useMutation<UnfollowSellerApiResponse,AxiosError,string>({
        mutationFn: (followerId:string) => followApi.UnfollowSeller(followerId),
    })
};
export default useUnfollowSeller;