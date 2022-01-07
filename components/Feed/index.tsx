import { Box, Text } from "@chakra-ui/layout";

const Feed = ({ children }) => {
  return (
    <Box>
      <Box
        padding="20px"
        position="fixed"
        top="0"
        bg="rgba(0, 0, 0, 0.65);"
        backdropFilter="blur(12px)"
        width="100%"
        zIndex="1"
      >
        <Text fontWeight="bold" fontSize="xl">
          Home
        </Text>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default Feed;
