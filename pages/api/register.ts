import brcypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password, username } = req.body;

  let user;
  try {
    user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      res.status(204);
      res.json({ error: "User already exist" });
    } else {
      user = await prisma.user.create({
        data: {
          email,
          password: brcypt.hashSync(password, 10),
          username,
        },
      });
      if (user) {
        const token = jwt.sign(
          { email: user.email, id: user.id, time: Date.now() },
          process.env.JWT_SECRET,
          {
            expiresIn: "6h",
          }
        );

        res.setHeader(
          "Set-Cookie",
          cookie.serialize("TWITTER_ACCESS_TOKEN", token, {
            httpOnly: true,
            maxAge: 8 * 60 * 60,
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
          })
        );

        res.status(200);
        res.json({ user });
      } else {
        res.status(401);
        res.json({ error: "Unable to register" });
      }
    }
  } catch (error) {
    res.status(500);
    res.json({ error: `server error: ${error.message}` });
  }
};
