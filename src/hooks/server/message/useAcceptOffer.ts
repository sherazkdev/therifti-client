import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import type { AcceptOfferApiResponse } from "../../../types/api";
import env from "../../../constants/loadEnv/loadEnv";
import MessageApi from "../../../api/message.api";
import BackendRequestServices from "../../../services/backendRequest.services";

const backendRequestServices = new BackendRequestServices(env.SERVER_URL);
const messageApi = new MessageApi(backendRequestServices);

const useAcceptOffer = () => {
  return useMutation<AcceptOfferApiResponse, AxiosError, string>({
    mutationFn: (offerId:string) => messageApi.AcceptOffer(offerId),
  });
};

export default useAcceptOffer;
