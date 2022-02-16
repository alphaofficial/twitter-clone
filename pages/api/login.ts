import brcypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { getUser } from "@/db/resources/users";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    const user = await getUser({ email });
    if (user && brcypt.compare(password, user.password)) {
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
      res.status(401);
      res.json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500);
    res.json({ error: `server error: ${error.message}` });
  }
};
