import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import onError from "@/middleware/error";
import { validateRoute } from "@/lib/auth";
import { getOtherUsers } from "@/db/resources/users";

const handler = nc({
  onError,
});

handler.get(
  validateRoute(
    async (req: NextApiRequest, res: NextApiResponse, user: any) => {
      let users;
      try {
        users = await getOtherUsers(user._id);
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
