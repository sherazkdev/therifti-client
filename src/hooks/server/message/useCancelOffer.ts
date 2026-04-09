import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import type { CancelOfferApiResponse } from "../../../types/api";
import env from "../../../constants/loadEnv/loadEnv";
import MessageApi from "../../../api/message.api";
import BackendRequestServices from "../../../services/backendRequest.services";

const backendRequestServices = new BackendRequestServices(env.SERVER_URL);
const messageApi = new MessageApi(backendRequestServices);

const useCancelOffer = () => {
  return useMutation<CancelOfferApiResponse, AxiosError, string>({
    mutationFn: (offerId:string) => messageApi.CancelOffer(offerId),
  });
};

export default useCancelOffer;
