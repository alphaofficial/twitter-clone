import { Box } from "@chakra-ui/layout";
import PageLayout from "../../components/pageLayout";
import Tweet from "../../components/Tweet";
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
  const req = await fetch(`${process.env.API_HOST}/api/tweets`);
  const tweets = await req.json();
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
