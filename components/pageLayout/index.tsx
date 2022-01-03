import { Box, Flex } from "@chakra-ui/layout";

const PageLayout = ({ children }) => {
  return (
    <Box>
      <Flex justifyContent="space-between">
        <Box width="33%">Left Sidebar</Box>
        <Box width="33%">
          <Box>{children}</Box>
        </Box>
        <Box width="33%">Right Sidebar</Box>
      </Flex>
    </Box>
  );
};

export default PageLayout;
