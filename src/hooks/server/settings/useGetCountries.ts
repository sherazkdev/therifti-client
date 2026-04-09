import { useQuery } from "@tanstack/react-query";

import SettingsApi from "../../../api/settings.api";
import BackendRequestServices from "../../../services/backendRequest.services";

const BaseURL = import.meta.env.VITE_SERVER_URL;

const backendRequestServices = new BackendRequestServices(BaseURL);
const settingsApi = new SettingsApi(backendRequestServices);

export default function useGetCountries() {
  return useQuery({
    queryKey: ["countries-list"],
    queryFn: () => settingsApi.GetCountries(),
  });
}