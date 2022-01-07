import { Box } from "@chakra-ui/layout";
import PageLayout from "../../components/pageLayout";
import Tweet from "../../components/Tweet";

const Home = ({ tweets }) => {
  return (
    <PageLayout>
      <Box>
        {tweets.map((tweet: any) => (
          <Tweet tweet={tweet} />
        ))}
      </Box>
    </PageLayout>
  );
};

Home.defaultProps = {
  tweets: [
    {
      name: "John Doe",
      src: "https://bit.ly/dan-abramov",
      username: "johndoe",
      content: "Hello World",
    },
    {
      name: "Jane Doe",
      src: "https://bit.ly/dan-abramov",
      username: "janedoe",
      content: "Hello World",
      imageSrc: "http://placekitten.com/300",
    },
    {
      name: "Jane Doe",
      src: "https://bit.ly/dan-abramov",
      username: "johndoe",
      content: "Hello World",
      imageSrc: "http://placekitten.com/300",
    },
    {
      name: "Albert King",
      src: "https://bit.ly/code-beast",
      username: "alphaxsalt",
      content:
        "Most people want to see you to do better, but not doing better than them.",
    },
  ],
};

export default Home;
