import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { getUserById } from "../db/resources/users";

export const validateRoute =
  (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    const { TWITTER_ACCESS_TOKEN: token } = req.cookies;
    if (token) {
      let user: any;
      try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET) as {
          id: string;
        };
        user = await getUserById(id);
        if (!user) {
          throw new Error("User not found");
        }
      } catch (error) {
        res.status(401);
        res.redirect("/");
      }

      return handler(req, res, user);
    }
    res.status(401);
    res.redirect("/");
  };
