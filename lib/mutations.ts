import { fetcher } from "./fetcher";

export const auth = (
  mode: "signin" | "signup",
  body: { identity: string; password: string }
) => {
  return fetcher(`/${mode}`, body);
};
