import nc from "next-connect";
import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import onError from "../../../middleware/error";
import { validateRoute } from "../../../lib/auth";

const handler = nc({
  onError,
});
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  let tweet;
  try {
    tweet = await prisma.tweet.findUnique({
      where: {
        id: +req.query.id,
      },
      include: {
        User: {
          select: {
            firstname: true,
            lastname: true,
            username: true,
            avatar: true,
          },
        },
        replies: true,
        likes: true,
        retweets: true,
      },
    });

    if (tweet) {
      res.status(200);
      res.json(tweet);
    }
    throw new Error("No tweets found");
  } catch (error) {
    res.status(204);
  }
});

handler.post(
  validateRoute(
    async (req: NextApiRequest, res: NextApiResponse, user: User) => {
      const { action } = req.body;
      switch (action) {
        case "like":
          try {
            // create like
            const likedTweet = await prisma.like.create({
              data: {
                userId: user.id,
                tweetId: +req.query.id,
              },
              include: {
                Tweet: true,
              },
            });

            if (likedTweet) {
              res.status(200);
              res.json({ likedTweet });
            }
            throw new Error("No likes found");
          } catch (error) {
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
