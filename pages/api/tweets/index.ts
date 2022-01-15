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
  let tweets: any[];
  try {
    tweets = await prisma.tweet.findMany({
      orderBy: [
        {
          id: "desc",
        },
      ],
      include: {
        User: {
          select: {
            firstname: true,
            lastname: true,
            username: true,
            avatar: true,
          },
        },
        retweets: {
          select: {
            userId: true,
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        replies: true,
      },
    });
    if (tweets) {
      res.status(200);
      res.json(tweets);
    }
    throw new Error("No tweets found");
  } catch (error) {
    res.status(204);
  }
});

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
        tweet = await prisma.tweet.create({
          data: {
            content,
            userId: user.id,
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
