import { fetcher } from "./fetcher";

export const auth = (
  mode: "login" | "register",
  body: {
    password: string;
    email: string;
    username?: string;
  }
) => {
  return fetcher(`/${mode}`, body);
};
