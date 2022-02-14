import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import onError from "@/middleware/error";
import { getUserById } from "@/db/resources/users";

const handler = nc({
  onError,
});

// get user
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  let user: any;
  try {
    user = await getUserById(req.query.id as string);
    if (user) {
      throw new Error("No tweets found");
    }
    res.status(200);
    res.json(user);
  } catch (error) {
    res.status(204);
  }
});
