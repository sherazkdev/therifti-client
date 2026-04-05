import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import type { SendOfferApiResponse, SendOfferPayload } from "../../../types/api";
import env from "../../../constants/loadEnv/loadEnv";
import ProductApi from "../../../api/product.api";
import BackendRequestServices from "../../../services/backendRequest.services";

const backendRequestServices = new BackendRequestServices(env.SERVER_URL);
const productApi = new ProductApi(backendRequestServices);

const useSendOffer = () => {
  return useMutation<SendOfferApiResponse, AxiosError, SendOfferPayload>({
    mutationFn: (payload: SendOfferPayload) => productApi.SendOffer(payload),
  });
};

export default useSendOffer;
