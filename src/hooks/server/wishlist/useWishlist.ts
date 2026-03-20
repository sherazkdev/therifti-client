import type { GetWishlistsApiResponse } from "../../../types/api/index";
import { useMutation } from "@tanstack/react-query";

/** Services */
import WishlistApi from "../../../api/wishlist.api";
import BackendRequestServices from "../../../services/backendRequest.services";
import type { AxiosError } from "axios";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const backendRequestServices = new BackendRequestServices(BaseURL);
const wishlistApi = new WishlistApi(backendRequestServices);

const useWishlist = () => {
    return useMutation<GetWishlistsApiResponse,AxiosError>({
        mutationFn: () => wishlistApi.GetWishlists(),
    })
};
export default useWishlist;