import { Box, Flex, Container } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import SimpleBar from "simplebar-react";
import LeftSidebar from "../LeftSidebar";
import RightSidebar from "../RightSidebar";
import Feed from "../Feed";

const PageLayout = ({ children }) => {
  const bg = useColorModeValue("white", "black");
  const color = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("rgb(239, 243, 244)", "gray.800");

  return (
    <Box bg={bg} color={color} height="100vh">
      <Container maxW="container.xl">
        <Flex justifyContent="space-between">
          <Box width="300px">
            <LeftSidebar />
          </Box>
          <Box
            width="calc(100% - 620px)"
            overflow="scroll"
            borderLeft="1px solid"
            borderRight="1px solid"
            borderColor={borderColor}
          >
            <SimpleBar style={{ height: "100vh" }}>
              <Feed>{children}</Feed>
            </SimpleBar>
          </Box>
          <Box width="320px" height="100vh" overflow="scroll">
            <SimpleBar style={{ height: "100vh" }}>
              <RightSidebar />
            </SimpleBar>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default PageLayout;
