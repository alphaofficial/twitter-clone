import { Box, Flex, Text } from "@chakra-ui/layout";
import { Avatar, Image } from "@chakra-ui/react";
import { BsChatRight } from "react-icons/bs";
import { AiOutlineRetweet } from "react-icons/ai";
import { FiShare, FiHeart } from "react-icons/fi";
import moment from "moment";

const Tweet = ({ tweet }) => {
  const actions = ({ likes, replies, retweets }) => [
    {
      name: "reply",
      icon: <BsChatRight size={15} />,
      number: replies,
    },
    {
      name: "retweet",
      icon: <AiOutlineRetweet size={15} />,
      number: retweets,
    },
    {
      name: "like",
      icon: <FiHeart size={15} />,
      number: likes,
    },
    {
      name: "share",
      icon: <FiShare size={15} />,
      number: null,
    },
  ];

  return (
    <Box
      key={tweet.id}
      sx={{
        "&:hover": {
          bg: "rgba(255, 255, 255, 0.03)",
        },
      }}
      padding="20px"
      borderBottom="2px solid"
      borderColor="gray.800"
    >
      <Box>
        <Flex>
          <Box mr="15px">
            <Avatar
              name={`${tweet.user.firstname || "John"} ${
                tweet.user.lastname || "Doe"
              }`}
              src={tweet.user.avatar || "https://bit.ly/dan-abramov"}
            />
          </Box>
          <Box width="100%">
            <Flex alignItems="center">
              <Box mr="5px">
                <Text fontWeight="bold">{`${tweet.user.firstname || "John"} ${
                  tweet.user.lastname || "Doe"
                }`}</Text>
              </Box>
              <Box>
                <Text color="gray.500">@{tweet.user.username}</Text>
              </Box>
              <Box mx="5px">
                <Text color="gray.500">·</Text>
              </Box>
              <Box>
                <Text color="gray.500">
                  {moment(tweet.createdAt).format("MMM DD, YYYY")}
                </Text>
              </Box>
            </Flex>
            <Box marginBottom="15px">
              <Text fontWeight="normal">{tweet.content}</Text>
            </Box>
            {tweet?.imageSrc && (
              <Box>
                <Image
                  border="2px solid"
                  borderColor="gray.800"
                  src={tweet.imageSrc}
                  borderRadius="12px"
                  width="100%"
                />
              </Box>
            )}
            <Box marginTop="20px" width="80%" fontSize="small">
              <Flex justifyContent="space-between" alignItems="center">
                {actions({
                  likes: tweet.Likes.length,
                  replies: tweet.Replies.length,
                  retweets: tweet.Retweets.length,
                }).map((action) => (
                  <Flex key={action.name} alignItems="center" color="gray.500">
                    {action.icon}
                    <Box ml="5px">
                      <Text>{action.number}</Text>
                    </Box>
                  </Flex>
                ))}
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
export default Tweet;
