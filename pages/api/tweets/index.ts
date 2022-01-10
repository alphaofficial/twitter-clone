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
  let tweets;
  try {
    tweets = await prisma.tweet.findMany({
      include: {
        user: {
          select: {
            firstname: true,
            lastname: true,
            username: true,
            avatar: true,
          },
        },
        Replies: true,
        Likes: {
          include: {
            users: true,
          },
        },
        Retweets: true,
      },
    });
    if (tweets) {
      res.status(200);
      res.json(tweets);
    }
    throw new Error("No tweets found");
  } catch (error) {
    res.status(204);
    res.json({ error: error.message });
  }
});

handler.post(
  validateRoute(
    async (req: NextApiRequest, res: NextApiResponse, user: User) => {
      const { content } = req.body;
      if (!content.length) {
        res.status(204);
        res.json({ error: "No content provided" });
      }
      let tweet;
      try {
        tweet = await prisma.tweet.create({
          data: {
            content,
            userId: user.id,
          },

          include: {
            user: {
              select: {
                firstname: true,
                lastname: true,
                username: true,
                avatar: true,
              },
            },
            Replies: true,
            Likes: {
              select: {
                users: true,
              },
            },
            Retweets: {
              select: {
                users: true,
              },
            },
          },
        });

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
