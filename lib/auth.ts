import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
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
        res.status(401);
        res.redirect("/");
      }
    }
    res.status(401);
    res.redirect("/");
  };
