import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

export const validateRoute =
  (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    const { TWITTER_ACCESS_TOKEN: token } = req.cookies;
    if (token) {
      let user: User;
      try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET) as {
          id: number;
        };
        user = await prisma.user.findUnique({
          where: { id },
        });
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
