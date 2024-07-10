import useSWR, { SWRResponse } from "swr";
import { fetcher } from "../utils/fetcher";

const API_URL = import.meta.env.VITE_APP_API_URL;

function useEntity<Entity, Error>(
  entity: URLSearchParams
): SWRResponse<Entity, Error> {
  const { data, error, isLoading, mutate, isValidating } = useSWR<
    Entity,
    Error
  >(`${API_URL}?${entity}`, fetcher);

  return { data, error, isLoading, mutate, isValidating };
}

export default useEntity;
