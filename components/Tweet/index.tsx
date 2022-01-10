import { Box, Flex, Text } from "@chakra-ui/layout";
import { Avatar, IconButton, Image } from "@chakra-ui/react";
import { BsChatRight } from "react-icons/bs";
import { AiOutlineRetweet } from "react-icons/ai";
import { FiShare, FiHeart } from "react-icons/fi";
import moment from "moment";
import { fetcher } from "../../lib/fetcher";
import { useUser } from "../../lib/hooks";

const Tweet = ({ tweet }) => {
  const { user } = useUser();
  console.log({ user, tweet });
  const handler = async (action: "like" | "retweet" | "reply" | "share") => {
    if (action === "like") {
      await fetcher(`tweets/${tweet.id}`, { action });
      return;
    }
    return null;
  };

  const actions = ({ likes, replies, retweets }) => [
    {
      name: "reply",
      icon: <BsChatRight size={15} />,
      number: replies,
      handler: () => handler("like"),
    },
    {
      name: "retweet",
      icon: <AiOutlineRetweet size={15} />,
      number: retweets,
      handler: () => handler("retweet"),
    },
    {
      name: "like",
      icon: <FiHeart size={15} />,
      number: likes,
      handler: () => handler("like"),
    },
    {
      name: "share",
      icon: <FiShare size={15} />,
      number: null,
      handler: () => handler("share"),
    },
  ];

  const handleStateColor = (actionName) => {
    if (tweet.Likes?.id === user?.id) {
      switch (actionName) {
        case "like":
          return "red.500";
        case "retweet":
          return "blue.500";
        default:
          return "gray.500";
      }
    }
  };
  return (
    <Box
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
                  <IconButton
                    aria-label="action-button"
                    variant="ghost"
                    _hover={{
                      bg: "transparent",
                    }}
                    onClick={action.handler}
                  >
                    <Flex
                      key={action.name}
                      alignItems="center"
                      color={handleStateColor(action.name)}
                    >
                      {action.icon}
                      <Box ml="5px">
                        <Text>{action.number}</Text>
                      </Box>
                    </Flex>
                  </IconButton>
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
