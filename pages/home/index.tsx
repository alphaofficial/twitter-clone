import { Box } from "@chakra-ui/layout";
import PageLayout from "../../components/pageLayout";
import Tweet from "../../components/Tweet";
import { useTweets } from "../../lib/hooks";
import prisma from "../../lib/prisma";

const Home = ({ fallback }) => {
  const { tweets } = useTweets(fallback);
  return (
    <PageLayout>
      <Box>
        {tweets?.map((tweet: any) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </Box>
    </PageLayout>
  );
};

export const getServerSideProps = async () => {
  const tweets = await prisma.tweet.findMany({
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
    return {
      props: {
        fallback: {
          tweets,
        },
      },
    };
  }
};

export default Home;
