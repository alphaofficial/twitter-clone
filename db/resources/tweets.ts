import { connectToDB } from "../connect";

export const getTweet = async (tweetId: string) => {
  const { db } = await connectToDB();
  const tweet = await db.collection("tweets").findOne({ _id: tweetId });
  return tweet;
};

export const getTweets = async () => {
  const { db } = await connectToDB();
  const tweets = await db.collection("tweets").find({}).toArray();
  return tweets;
};

export const likeTweet = async (tweetId: string, user: string) => {
  const { db } = await connectToDB();
  const operation = await db
    .collection("tweets")
    .updateOne({ _id: tweetId }, { $push: { likes: user } });
  return operation;
};

export const unLikeTweet = async (tweetId: string, user: string) => {
  const { db } = await connectToDB();
  const operation = await db
    .collection("tweets")
    .updateOne({ _id: tweetId }, { $pull: { likes: user } });
  return operation;
};

export const retweet = async (tweetId: string, user: string) => {
  const { db } = await connectToDB();
  const operation = await db
    .collection("tweets")
    .updateOne({ _id: tweetId }, { $push: { retweets: user } });
  return operation;
};

export const undoRetwweet = async (tweetId: string, user: string) => {
  const { db } = await connectToDB();
  const operation = await db
    .collection("tweets")
    .updateOne({ _id: tweetId }, { $pull: { retweets: user } });
  return operation;
};

export const createTweet = async (tweet: any) => {
  const { db } = await connectToDB();
  await db.collection("tweets").insertOne({
    ...tweet,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
  });
};
