import useSWR from "swr";
import { fetcher } from "./fetcher";

// get user
export const useUser = () => {
  const { data, error } = useSWR("user", fetcher);
  return { user: data, isLoading: !data && !error, isError: error };
};

// get users
export const useUsers = () => {
  const { data, error } = useSWR("users", fetcher);
  return { users: data, isLoading: !data && !error, isError: error };
};

// get tweets
export const useTweets = (fallback = {}) => {
  const { data, error } = useSWR("tweets", fetcher, { fallback });
  return { tweets: data, isLoading: !data && !error, isError: error };
};
