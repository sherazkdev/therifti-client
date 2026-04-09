import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import type { SendOfferApiResponse, SendOfferInterface } from "../../../types/api";
import env from "../../../constants/loadEnv/loadEnv";
import MessageApi from "../../../api/message.api";
import BackendRequestServices from "../../../services/backendRequest.services";

const backendRequestServices = new BackendRequestServices(env.SERVER_URL);
const messageApi = new MessageApi(backendRequestServices);

const useSendOffer = () => {
  return useMutation<SendOfferApiResponse, AxiosError, SendOfferInterface>({
    mutationFn: (payload: SendOfferInterface) => messageApi.SendOffer(payload),
  });
};

export default useSendOffer;
