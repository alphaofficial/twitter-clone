import { useColorModeValue } from "@chakra-ui/react";
import useSWR from "swr";
import { fetcher } from "./fetcher";

// get user
export const useUser = () => {
  const { data, error } = useSWR("user", fetcher);
  return { user: data, isLoading: !data && !error, isError: error };
};

// get user by id
export const useUserId = (id: string) => {
  const { data, error } = useSWR(`users/${id}`, fetcher);
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

export const useAppTheme = () => {
  const borderColor = useColorModeValue("rgb(239, 243, 244)", "gray.800");
  const itemBackground = useColorModeValue("white", "rgba(0, 0, 0, 0.65)");
  const twitterSrc = useColorModeValue("/twitter-blue.png", "/twitter.png");
  const pageBackground = useColorModeValue("white", "black");
  const color = useColorModeValue("black", "white");
  const inputBackground = useColorModeValue("#f7f9f9", "rgba(22, 24, 28, 1)");
  const secondaryColor = useColorModeValue("black", "gray.400");
  const signInButtonHover = useColorModeValue("gray.200", "gray.900");
  const modalBackground = useColorModeValue(
    "rgba(0, 0, 0, 0.4)",
    "rgba(91, 112, 131, 0.4)"
  );
  const loginModalBackground = useColorModeValue(
    "rgba(0, 0, 0, 0.4)",
    "rgba(91, 112, 131, 0.4)"
  );
  const secondaryButtonBackground = useColorModeValue("black", "gray.100");
  const secondaryButtonHover = useColorModeValue("black", "gray.300");
  const secondaryButtonColor = useColorModeValue("white", "black");

  const menuHoverColor = useColorModeValue(
    "rgba(15,20,21,0.1)",
    "rgba(217,217,217,0.1)"
  );

  return {
    borderColor,
    itemBackground,
    twitterSrc,
    pageBackground,
    color,
    inputBackground,
    secondaryColor,
    signInButtonHover,
    modalBackground,
    loginModalBackground,
    secondaryButtonBackground,
    secondaryButtonHover,
    secondaryButtonColor,
    menuHoverColor,
  };
};
