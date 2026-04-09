import { useMutation } from "@tanstack/react-query";

import SettingsApi from "../../../api/settings.api";
import BackendRequestServices from "../../../services/backendRequest.services";

const BaseURL = import.meta.env.VITE_SERVER_URL;

const backendRequestServices = new BackendRequestServices(BaseURL);
const settingsApi = new SettingsApi(backendRequestServices);

export default function useGetCities() {
  return useMutation({
    mutationFn: (body: { country: string }) =>
      settingsApi.GetCities(body),
  });
}