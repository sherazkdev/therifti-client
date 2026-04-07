export interface CountryInterface {
  name: string;
  Iso2: string;
  Iso3: string;
}

export interface CountriesApiResponse {
  error: boolean;
  msg: string;
  data: CountryInterface[];
}

export interface CitiesApiResponse {
  error: boolean;
  msg: string;
  data: string[];
}
