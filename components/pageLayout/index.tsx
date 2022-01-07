import { Box, Flex, Container } from "@chakra-ui/layout";
import LeftSidebar from "../LeftSidebar";
import RightSidebar from "../RightSidebar";
import Feed from "../Feed";

const PageLayout = ({ children }) => {
  return (
    <Box bg="black" color="white" height="100vh">
      <Container maxW="container.xl">
        <Flex justifyContent="space-between">
          <Box width="20%">
            <LeftSidebar />
          </Box>
          <Box
            width="55%"
            height="100vh"
            overflow="scroll"
            borderLeft="2px solid"
            borderColor="gray.800"
          >
            <Feed>{children}</Feed>
          </Box>
          <Box width="25%" borderLeft="2px solid" borderColor="gray.800">
            <RightSidebar />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default PageLayout;
