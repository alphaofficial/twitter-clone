import { Box } from "@chakra-ui/layout";
import PageLayout from "../../components/pageLayout";
import Tweet from "../../components/Tweet";
import { getTweets } from "../../db/resources/tweets";
import { useTweets } from "../../lib/hooks";

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
  let tweets = [];
  try {
    tweets = await getTweets();
    if (tweets) {
      return {
        props: {
          fallback: {
            tweets,
          },
        },
      };
    }
    throw new Error("No tweets found");
  } catch (error) {
    console.log({ error });
  }
};

export default Home;
