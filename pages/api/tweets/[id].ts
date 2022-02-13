import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import onError from "@/middleware/error";
import { validateRoute } from "@/lib/auth";
import {
  getTweet,
  likeTweet,
  retweet,
  undoRetwweet,
  unLikeTweet,
} from "@/db/resources/tweets";

const handler = nc({
  onError,
});

// get tweet
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  let tweet;
  try {
    tweet = await getTweet(req.query.id as string);
    if (tweet) {
      res.status(200);
      res.json(tweet);
    }
    throw new Error("No tweets found");
  } catch (error) {
    res.status(204);
  }
});

//  tweet operations
handler.post(
  validateRoute(
    async (req: NextApiRequest, res: NextApiResponse, user: any) => {
      const { action } = req.body;
      switch (action) {
        case "like":
          try {
            const operation = await likeTweet(req.query.id as string, user._id);

            if (operation.acknowledged) {
              res.status(200);
              return;
            }
            throw new Error("Failed to like tweet");
          } catch (error) {
            console.log({ error });
            res.status(500);
            res.json({ error: error.message });
          }
          break;
        case "undoLike":
          try {
            const operation = await unLikeTweet(
              req.query.id as string,
              user._id
            );
            if (operation.acknowledged) {
              res.status(200);
              return;
            }
            throw new Error("Failed to undo like");
          } catch (error) {
            console.log({ error });

            res.status(500);
            res.json({ error: error.message });
          }
          break;
        case "retweet":
          try {
            const operation = await retweet(req.query.id as string, user._id);

            if (operation.acknowledged) {
              res.status(200);
              return;
            }
            throw new Error("Failed to retweet");
          } catch (error) {
            console.log({ error });

            res.status(500);
            res.json({ error: error.message });
          }
          break;
        case "undoRetweet":
          try {
            const operation = await undoRetwweet(
              req.query.id as string,
              user._id
            );

            if (operation.acknowledged) {
              res.status(200);
              return;
            }
            throw new Error("Failed to undo retweet");
          } catch (error) {
            console.log({ error });

            res.status(500);
            res.json({ error: error.message });
          }
          break;
        default:
          throw new Error("Invalid action");
      }
    }
  )
);

export default handler;
