import { Box, Flex, Text } from "@chakra-ui/layout";
import {
  Avatar,
  Button,
  CircularProgress,
  Input,
  Skeleton,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiImage } from "react-icons/bi";
import { VscSmiley } from "react-icons/vsc";
import { useSWRConfig } from "swr";
import { fetcher } from "../../lib/fetcher";
import { useUser } from "../../lib/hooks";

const Feed = ({ children }) => {
  const { mutate, cache } = useSWRConfig();
  const { user, isLoading, isError } = useUser();
  const [content, setContent] = useState("");

  const handleCharCount = (chars: string) => {
    const totalCount = 280;
    const remainingCount = totalCount - chars.length;
    const percentage = (remainingCount / totalCount) * 100;
    return percentage;
  };
  const handleTweet = async () => {
    setContent("");
    const { tweet } = await fetcher("tweets", { content });
    if (tweet) {
      const data = cache.get("tweets");
      await mutate("/tweets", { ...data, tweet });
    }
  };
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
      <Skeleton isLoaded={!isLoading || isError}>
        <Box padding="20px" borderBottom="2px solid" borderColor="gray.800">
          <Flex width="100%">
            <Box mr="15px">
              <Avatar
                name={`${user?.firstname} ${user?.lastname}`}
                src={user?.avatar}
              />
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
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
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
                        <CircularProgress
                          color="red"
                          value={handleCharCount(content)}
                          size={25}
                        />
                      </Box>
                      <Box>
                        <Button
                          type="button"
                          size="sm"
                          sx={{
                            "&:hover": {
                              bg: "twitter.700",
                            },
                          }}
                          rounded="full"
                          bg="twitter.500"
                          color="white"
                          onClick={handleTweet}
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
      </Skeleton>
      <Box>{children}</Box>
    </Box>
  );
};

export default Feed;
