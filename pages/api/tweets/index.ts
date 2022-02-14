import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import onError from "@/middleware/error";
import { validateRoute } from "@/lib/auth";
import { createTweet, getTweets } from "@/db/resources/tweets";
import { getUserById } from "@/db/resources/users";
import { serialize } from "@/lib/serialize";

const handler = nc({
  onError,
});

// get tweets
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  let tweets = [];
  try {
    tweets = await getTweets();
    if (tweets) {
      await Promise.all(
        tweets.map(async (tweet) => {
          const user = await getUserById(tweet.user);
          if (user) {
            tweet.user = user;
          }
          return tweet;
        })
      );
      res.status(200);
      res.json({ tweets: serialize(tweets) });
    }
    throw new Error("No tweets found");
  } catch (error) {
    res.status(204);
  }
});

// create tweet
handler.post(
  validateRoute(async (req: NextApiRequest, res: NextApiResponse) => {
    const { content } = req.body;
    if (!content.length) {
      res.status(204).end();
      return;
    }
    let tweet;
    try {
      tweet = await createTweet(req.body);
      if (tweet) {
        res.status(200);
        res.json({ tweet });
      }
      throw new Error("Unable to create tweet");
    } catch (error) {
      console.log({ error });
      res.status(500);
      res.json({ error: error.message });
    }
  })
);

export default handler;
