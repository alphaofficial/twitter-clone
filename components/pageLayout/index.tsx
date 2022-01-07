import { Box, Flex, Container } from "@chakra-ui/layout";
import LeftSidebar from "../LeftSidebar";
import RightSidebar from "../RightSidebar";

const PageLayout = ({ children }) => {
  return (
    <Box bg="black" color="white" height="100vh">
      <Container maxW="container.xl">
        <Flex justifyContent="space-between">
          <Box width="25%">
            <LeftSidebar />
          </Box>
          <Box
            width="50%"
            height="100vh"
            overflow="scroll"
            borderLeft="1px solid"
            borderRight="1px solid"
            borderColor="gray.800"
          >
            <Box>{children}</Box>
          </Box>
          <Box width="25%">
            <RightSidebar />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default PageLayout;
