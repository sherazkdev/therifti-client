import type { GetWishlistsApiResponse } from "../../../types/api/index";
import { useQuery } from "@tanstack/react-query";

/** Services */
import WishlistApi from "../../../api/wishlist.api";
import BackendRequestServices from "../../../services/backendRequest.services";
import type { AxiosError } from "axios";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const backendRequestServices = new BackendRequestServices(BaseURL);
const wishlistApi = new WishlistApi(backendRequestServices);

const useWishlist = () => {
    return useQuery<GetWishlistsApiResponse,AxiosError>({
        queryKey:["wishlists"],
        queryFn: () => wishlistApi.GetWishlists(),
    })
};
export default useWishlist;