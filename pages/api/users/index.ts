import nc from "next-connect";
import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import onError from "../../../middleware/error";
import { validateRoute } from "../../../lib/auth";

const handler = nc({
  onError,
});

handler.get(
  validateRoute(
    async (req: NextApiRequest, res: NextApiResponse, user: User) => {
      let users;
      try {
        users = await prisma.user.findMany({
          where: {
            NOT: {
              id: user.id,
            },
          },
          select: {
            firstname: true,
            lastname: true,
            username: true,
            avatar: true,
          },
        });
        if (users) {
          res.status(200);
          res.json(users);
        }
        throw new Error("No tweets found");
      } catch (error) {
        res.status(204);
        res.json({ error: error.message });
      }
    }
  )
);

export default handler;
