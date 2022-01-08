import { Box } from "@chakra-ui/layout";
import PageLayout from "../../components/pageLayout";
import Tweet from "../../components/Tweet";
import { useTweets } from "../../lib/hooks";
import prisma from "../../lib/prisma";

const Home = ({ tweets }) => {
  const { tweets: allTweets, isError } = useTweets();
  return (
    <PageLayout>
      {isError ? null : (
        <Box>
          {[...tweets, ...allTweets].map((tweet: any) => (
            <Tweet tweet={tweet} />
          ))}
        </Box>
      )}
    </PageLayout>
  );
};

Home.defaultProps = {
  tweets: [
    {
      id: 1,
      createdAt: "2022-01-03T03:38:31.549Z",
      updatedAt: "2022-01-03T03:38:31.550Z",
      content:
        "Since my last NFT was banned, I made another NFT and dApp. This time for autonomous art: https://autonomous.graphics\n\nIt's a collective work. Anyone can mint a token for it by making a visual contribution, and the price to mint is paid to all previous contributors.",
      userId: 1,
      user: {
        firstname: "John",
        lastname: "Doe",
        username: "firstuser",
        avatar: "https://bit.ly/dan-abramov",
      },
    },
  ],
};

export const getServerSideProps = async () => {
  let tweets = [];
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
    if (tweets) {
      return { props: { tweets } };
    }
    throw new Error("No tweets found");
  } catch (error) {
    console.warn(error.message);
  }
};

export default Home;
