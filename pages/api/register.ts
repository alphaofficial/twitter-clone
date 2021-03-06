import brcypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { createUser, getUser } from "@/db/resources/users";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password, username, avatar, firstname, lastname } = req.body;
  try {
    const existingUser = await getUser({ email });
    if (existingUser) {
      res.status(409);
      res.json({ error: "User already exist" });
    } else {
      const newUser = await createUser({
        firstname,
        lastname,
        email,
        password: brcypt.hashSync(password, 10),
        username,
        avatar: avatar || "https://i.pravatar.cc/300",
      });
      if (newUser.acknowledged) {
        const user = await getUser({ email });
        if (user) {
          const token = jwt.sign(
            { email: user.email, id: user._id, time: Date.now() },
            process.env.JWT_SECRET,
            {
              expiresIn: "6h",
            }
          );

          res.setHeader(
            "Set-Cookie",
            cookie.serialize("TWITTER_ACCESS_TOKEN", token, {
              httpOnly: true,
              maxAge: 6 * 60 * 60,
              path: "/",
              sameSite: "lax",
              secure: process.env.NODE_ENV === "production",
            })
          );

          res.status(200);
          res.json({ data: user });
        } else {
          res.status(400);
          res.json({ error: "Unable to register" });
        }
      } else {
        res.status(400);
        res.json({ error: "Unable to register" });
      }
    }
  } catch (error) {
    res.status(500);
    res.json({ error: `server error: ${error.message}` });
  }
};
