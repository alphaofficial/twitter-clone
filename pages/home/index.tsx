import { Box, Text } from "@chakra-ui/layout";
import PageLayout from "../../components/pageLayout";

const Home = () => {
  return (
    <PageLayout>
      <Box paddingX="10px">
        {new Array(100).fill(1).map((_, i) => (
          <Text paddingY="20px">{`Feed #${i}`}</Text>
        ))}
      </Box>
    </PageLayout>
  );
};

export default Home;
