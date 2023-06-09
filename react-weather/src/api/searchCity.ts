import axios from "axios";

export interface ResponseCityApi {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

export const searchCityApi = async (
  query: string
): Promise<ResponseCityApi[]> => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_API_URL}/search.json?key=${process.env.REACT_APP_API_KEY}&lang=ru&q=${query}`
  );

  return data;
};
