import { Box, Flex, Text } from "@chakra-ui/layout";
import { Avatar, Button, CircularProgress, Input } from "@chakra-ui/react";
import { BiImage } from "react-icons/bi";
import { VscSmiley } from "react-icons/vsc";

const Feed = ({ children }) => {
  return (
    <Box>
      <Box
        padding="20px"
        position="sticky"
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
      <Box padding="20px" borderBottom="2px solid" borderColor="gray.800">
        <Flex width="100%">
          <Box mr="15px">
            <Avatar name="Albert Akrong" />
          </Box>
          <Box width="100%">
            <Box marginTop="10px">
              <Input
                _placeholder={{
                  color: "#6d767c",
                }}
                fontWeight="normal"
                fontSize="xl"
                variant="unstyled"
                placeholder="What's happening?"
              />
            </Box>
            <Box marginTop="20px" color="twitter.500">
              <Flex justifyContent="space-between" alignItems="center">
                <Box>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Box mr="4px">
                      <BiImage size={20} />
                    </Box>
                    <Box>
                      <VscSmiley size={20} />
                    </Box>
                  </Flex>
                </Box>
                <Box>
                  <Flex alignItems="center">
                    <Box mr="5px">
                      <CircularProgress color="red" value={80} size={25} />
                    </Box>
                    <Box>
                      <Button
                        size="sm"
                        sx={{
                          "&:hover": {
                            bg: "twitter.700",
                          },
                        }}
                        rounded="full"
                        bg="twitter.500"
                        color="white"
                      >
                        Tweet
                      </Button>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default Feed;
