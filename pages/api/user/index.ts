import nc from "next-connect";
import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import onError from "../../../middleware/error";
import { validateRoute } from "../../../lib/auth";

const handler = nc({
  onError,
});

handler.get(
  validateRoute(
    async (req: NextApiRequest, res: NextApiResponse, user: User) => {
      res.status(200);
      res.json(user);
    }
  )
);

export default handler;
