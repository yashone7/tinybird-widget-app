import axios, { AxiosRequestConfig } from "axios";

const apiToken = import.meta.env.VITE_APP_API_TOKEN;

export const fetcher = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await axios.get<T>(url, {
    ...config,
    headers: {
      ...config?.headers,
      Authorization: `Bearer ${apiToken}`,
    },
  });
  return response.data;
};
