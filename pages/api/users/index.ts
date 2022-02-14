import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import onError from "@/middleware/error";
import { validateRoute } from "@/lib/auth";
import { getOtherUsers } from "@/db/resources/users";
import { serialize } from "@/lib/serialize";

const handler = nc({
  onError,
});

handler.get(
  validateRoute(
    async (req: NextApiRequest, res: NextApiResponse, user: any) => {
      let users = [];
      try {
        users = await getOtherUsers(user._id);
        if (!users || !users.length) {
          throw new Error("No tweets found");
        }
        res.status(200);
        res.json({ users: serialize(users) });
      } catch (error) {
        res.status(204);
      }
    }
  )
);

export default handler;
