import nc from "next-connect";
import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import onError from "../../../middleware/error";
import { validateRoute } from "../../../lib/auth";
import { createTweet, getTweets } from "../../../db/resources/tweets";

const handler = nc({
  onError,
});

// get tweets
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  let tweets: any[];
  try {
    tweets = await getTweets();
    if (tweets) {
      res.status(200);
      res.json(tweets);
    }
    throw new Error("No tweets found");
  } catch (error) {
    res.status(204);
  }
});

// create tweet
handler.post(
  validateRoute(
    async (req: NextApiRequest, res: NextApiResponse, user: User) => {
      const { content } = req.body;
      if (!content.length) {
        res.status(204).end();
        return;
      }
      let tweet;
      try {
        tweet = await createTweet({ content, user });
        if (tweet) {
          res.status(200);
          res.json({ tweet });
        }
        throw new Error("Unable to create tweet");
      } catch (error) {
        res.status(500);
        res.json({ error: error.message });
      }
    }
  )
);

export default handler;
