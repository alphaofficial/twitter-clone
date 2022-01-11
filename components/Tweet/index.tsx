import { Box, Flex, Text } from "@chakra-ui/layout";
import { FC, useEffect, useState } from "react";
import { Avatar, IconButton, Image } from "@chakra-ui/react";
import { BsChatRight } from "react-icons/bs";
import { AiOutlineRetweet } from "react-icons/ai";
import { FiShare, FiHeart } from "react-icons/fi";
import moment from "moment";
import { fetcher } from "../../lib/fetcher";
import { useUser } from "../../lib/hooks";

const renderIcon = ({ icon, color, size = 15 }) => {
  const iconTypes: { [key: string]: any } = {
    reply: <BsChatRight size={size} color={color} />,
    retweet: <AiOutlineRetweet size={size} color={color} />,
    like: <FiHeart size={size} color={color} />,
    share: <FiShare size={size} color={color} />,
  };

  return iconTypes[icon];
};

const Tweet: FC<{ tweet: any }> = ({ tweet }) => {
  const { user } = useUser();
  const [userLiked, setUserLiked] = useState<boolean>(false);
  const [userRetweeted, setUserRetweeted] = useState(false);

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
      icon: (color: string) => renderIcon({ icon: "reply", color }),
      number: replies,
      handler: () => handler("reply"),
    },
    {
      name: "retweet",
      icon: (color: string) => renderIcon({ icon: "retweet", color }),
      number: retweets,
      handler: () => handler("retweet"),
    },
    {
      name: "like",
      icon: (color: string) => renderIcon({ icon: "like", color }),
      number: likes,
      handler: () => handler("like"),
    },
    {
      name: "share",
      icon: (color: string) => renderIcon({ icon: "share", color }),
      number: null,
      handler: () => handler("share"),
    },
  ];

  const handleStateColor = (actionName: string) => {
    const iconStateColor: { [key: string]: string } = {
      liked: userLiked ? "red.500" : "gray.500",
      retweeted: userRetweeted ? "blue.500" : "gray.500",
    };

    return iconStateColor[actionName] || "gray.500";
  };

  useEffect(() => {
    const liked = tweet.likes.find(
      (like: { userId: string }) => like.userId === user?.id
    );
    const retweeted = tweet.retweets.find(
      (retweet: { userId: string }) => retweet.userId === user?.id
    );
    setUserLiked(!!liked);
    setUserRetweeted(!!retweeted);
  }, [tweet, user]);

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
              name={`${tweet?.user?.firstname || "John"} ${
                tweet?.user?.lastname || "Doe"
              }`}
              src={tweet?.user?.avatar || "https://bit.ly/dan-abramov"}
            />
          </Box>
          <Box width="100%">
            <Flex alignItems="center">
              <Box mr="5px">
                <Text fontWeight="bold">{`${tweet?.user?.firstname || "John"} ${
                  tweet?.user?.lastname || "Doe"
                }`}</Text>
              </Box>
              <Box>
                <Text color="gray.500">@{tweet?.user?.username}</Text>
              </Box>
              <Box mx="5px">
                <Text color="gray.500">·</Text>
              </Box>
              <Box>
                <Text color="gray.500">
                  {moment(tweet?.createdAt).format("MMM DD, YYYY")}
                </Text>
              </Box>
            </Flex>
            <Box marginBottom="15px">
              <Text fontWeight="normal">{tweet?.content}</Text>
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
                  likes: tweet.likes.length,
                  replies: tweet.replies.length,
                  retweets: tweet.retweets.length,
                }).map((action) => (
                  <IconButton
                    aria-label="action-button"
                    variant="ghost"
                    _hover={{
                      bg: "transparent",
                    }}
                    onClick={action.handler}
                  >
                    <Flex key={action.name} alignItems="center">
                      {action.icon(handleStateColor(action.name))}
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
