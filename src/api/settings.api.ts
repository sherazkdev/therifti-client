import type BackendRequestServices from "../services/backendRequest.services";
import type {
  CountriesApiResponse,
  CitiesApiResponse,
} from "../types/api/settings.types";

class SettingsApi {
  private apiServices: BackendRequestServices;

  constructor(apiServices: BackendRequestServices) {
    this.apiServices = apiServices;
  }

  public async GetCountries(): Promise<CountriesApiResponse> {
    const response = await this.apiServices.ExternalGet<CountriesApiResponse>(
      "https://countriesnow.space/api/v0.1/countries/iso"
    );

    return response;
  }

  public async GetCities(body: {
    country: string;
  }): Promise<CitiesApiResponse> {
    const response = await this.apiServices.ExternalPost<CitiesApiResponse>(
      "https://countriesnow.space/api/v0.1/countries/cities",
      body
    );

    return response;
  }
}

export default SettingsApi;
