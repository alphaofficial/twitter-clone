import { mutate } from "swr";
import { nanoid } from "nanoid";
import { Box, Flex, Text } from "@chakra-ui/layout";
import {
  Avatar,
  Button,
  CircularProgress,
  IconButton,
  Skeleton,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { VscSmiley } from "react-icons/vsc";
import { fetcher } from "@/lib/fetcher";
import { useTweets, useUser } from "@/lib/hooks";

const totalCount = 280;

const Feed = ({ children }) => {
  const { tweets } = useTweets();
  const { user, isLoading, isError } = useUser();
  const [content, setContent] = useState("");

  const handleTweet = async () => {
    const tweet = {
      content,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
      imageSrc: [],
      likes: [],
      retweets: [],
      user: user._id,
    };

    // update the local data immediately, but disable the revalidation
    const tweetWithId = { ...tweet, _id: nanoid(12) };
    mutate("tweets", { ...tweets, tweetWithId }, false);
    setContent("");
    // send a request to the API to update the source
    await fetcher("tweets", tweet);
    // trigger a revalidation (refetch) to make sure our local data is correct
    mutate("tweets");
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
      <Skeleton
        startColor="gray.900"
        endColor="black"
        isLoaded={!isLoading || isError}
      >
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
                <Textarea
                  _placeholder={{
                    color: "#6d767c",
                  }}
                  fontWeight="normal"
                  fontSize="xl"
                  variant="unstyled"
                  placeholder="What's happening?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  maxLength={totalCount}
                />
              </Box>
              <Box marginTop="20px" color="twitter.500">
                <Flex justifyContent="space-between" alignItems="center">
                  <Box position="relative">
                    <Flex justifyContent="space-between" alignItems="center">
                      {/* <Box mr="4px">
                        <BiImage size={20} />
                      </Box> */}
                      <Box position="absolute" left="-10px">
                        <IconButton
                          _hover={{
                            bg: "transparent",
                          }}
                          aria-label="emoji-button"
                          variant="ghost"
                        >
                          <VscSmiley size={20} />
                        </IconButton>
                      </Box>
                    </Flex>
                  </Box>
                  <Box>
                    <Flex alignItems="center">
                      <Box mr="5px">
                        <CircularProgress
                          color={content.length > 250 ? "red" : "twitter.500"}
                          value={content.length}
                          size={25}
                          max={totalCount}
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
