import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { getUserById } from "@/db/resources/users";

export const validateRoute =
  (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    const { TWITTER_ACCESS_TOKEN: token } = req.cookies;
    if (token) {
      try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET) as {
          id: string;
        };
        const user = await getUserById(id);
        if (!user) {
          throw new Error("User not found");
        }
        return handler(req, res, user);
      } catch (error) {
        // invalidate cookie header
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("TWITTER_ACCESS_TOKEN", token, {
            httpOnly: true,
            maxAge: 0,
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
          })
        );
        res.status(401);
        res.json({ error: "Invalid credentials" });
        res.redirect("/");
        return;
      }
    }
    res.status(401);
    res.redirect("/");
  };
