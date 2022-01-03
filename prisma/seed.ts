import bcrypt from "bcrypt";
import prisma from "../lib/prisma";

const run = async () => {
  const salt = bcrypt.genSaltSync();
  const user = await prisma.user.upsert({
    where: { email: "user@test.com" },
    update: {},
    create: {
      email: "user@test.com",
      password: bcrypt.hashSync("password", salt),
      username: "firstuser",
    },
  });

  await prisma.tweet.createMany({
    data: [
      {
        content: "My first tweet",
        userId: user.id,
        likes: 0,
        retweets: 0,
      },
      {
        content: "My second tweet",
        userId: user.id,
        likes: 0,
        retweets: 0,
      },
      {
        content: "My third tweet",
        userId: user.id,
        likes: 0,
        retweets: 0,
      },
      {
        content: "My fourth tweet",
        userId: user.id,
        likes: 0,
        retweets: 0,
      },
      {
        content: "My fifth tweet",
        userId: user.id,
        likes: 0,
        retweets: 0,
      },
    ],
    skipDuplicates: true, // Skip 'Bobo'
  });
};

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
