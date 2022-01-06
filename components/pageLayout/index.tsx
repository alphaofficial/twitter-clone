import { Box, Flex, Container } from "@chakra-ui/layout";
import LeftSidebar from "../LeftSidebar";
import RightSidebar from "../RightSidebar";

const PageLayout = ({ children }) => {
  return (
    <Box bg="black" color="white" height="100vh">
      <Container maxW="container.xl">
        <Flex justifyContent="space-between">
          <Box width="33%">
            <LeftSidebar />
          </Box>
          <Box width="33%" height="100vh" overflow="scroll">
            <Box>{children}</Box>
          </Box>
          <Box width="33%">
            <RightSidebar />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default PageLayout;
