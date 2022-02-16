import { Box, Flex, Container } from "@chakra-ui/layout";
import SimpleBar from "simplebar-react";
import LeftSidebar from "../LeftSidebar";
import RightSidebar from "../RightSidebar";
import Feed from "../Feed";
import { useAppTheme } from "@/lib/hooks";

const PageLayout = ({ children }) => {
  const { itemBackground, borderColor, color } = useAppTheme();

  return (
    <Box bg={itemBackground} color={color} height="100vh">
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
