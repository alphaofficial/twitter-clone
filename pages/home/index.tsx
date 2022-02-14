import { Box } from "@chakra-ui/layout";
import PageLayout from "@/components/PageLayout";
import Tweet from "@/components/Tweet";
import { getTweets } from "@/db/resources/tweets";
import { useTweets } from "@/lib/hooks";
import { serialize } from "@/lib/serialize";

const Home = ({ fallback }) => {
  const { tweets } = useTweets(fallback);

  return (
    <PageLayout>
      <Box>
        {tweets?.map((tweet: any) => (
          <Tweet key={tweet._id} tweet={tweet} />
        ))}
      </Box>
    </PageLayout>
  );
};

export const getServerSideProps = async () => {
  let tweets = [];
  try {
    tweets = await getTweets();
    console.log({ tweets });
    if (!tweets) {
      throw new Error("No tweets found");
    }
    return {
      props: {
        fallback: {
          tweets: serialize(tweets),
        },
      },
    };
  } catch (error) {
    console.log({ error });
  }
};

export default Home;
