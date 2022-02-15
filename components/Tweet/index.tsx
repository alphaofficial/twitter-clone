import { mutate } from "swr";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { BsChatRight } from "react-icons/bs";
import { FiShare } from "react-icons/fi";
import { AiOutlineRetweet, AiTwotoneHeart } from "react-icons/ai";
import { Box, Flex, Text } from "@chakra-ui/layout";
import {
  Avatar,
  IconButton,
  Image,
  Skeleton,
  useColorModeValue,
} from "@chakra-ui/react";
import { fetcher } from "@/lib/fetcher";
import { useTweets, useUser } from "@/lib/hooks";

const renderIcon = ({ icon, color, size = 15 }) => {
  const iconTypes: { [key: string]: any } = {
    reply: <BsChatRight size={size} color={color} />,
    retweet: <AiOutlineRetweet size={size} color={color} />,
    like: <AiTwotoneHeart size={size} color={color} />,
    share: <FiShare size={size} color={color} />,
  };

  return iconTypes[icon];
};

const Tweet: FC<{ tweet: any }> = ({ tweet }) => {
  const { user } = useUser();
  const { tweets } = useTweets();
  const [userLiked, setUserLiked] = useState<boolean>(false);
  const [userRetweeted, setUserRetweeted] = useState(false);
  const [hasActed, setHasActed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [likes, setLikes] = useState<number>(tweet?.likes?.length || 0);
  const [retweets, setRetweets] = useState<number>(
    tweet?.retweets?.length || 0
  );

  const borderColor = useColorModeValue("rgb(239, 243, 244)", "gray.800");

  const tweetOperations = (operation: string) => {
    const tweetIndex = tweets.findIndex((t) => t._id === tweet._id);
    const actions = {
      LIKE_TWEET: () => {
        setUserLiked(true);
        setLikes((prevState) => prevState + 1);
        tweets[tweetIndex].likes += 1;
        mutate("tweets", tweets, false);
        fetcher(`tweets/${tweet._id}`, { action: "like" });
      },
      UNDO_LIKE_TWEET: async () => {
        setUserLiked(false);
        setLikes((prevState) => prevState - 1);
        tweets[tweetIndex].likes -= 1;
        mutate("tweets", tweets, false);
        await fetcher(`tweets/${tweet._id}`, { action: "undoLike" });
      },
      RETWEET: () => {
        setUserRetweeted(true);
        setRetweets((prevState) => prevState + 1);
        tweets[tweetIndex].retweets += 1;
        mutate("tweets", tweets, false);
        fetcher(`tweets/${tweet._id}`, { action: "retweet" });
      },
      UNDO_RETWEET: () => {
        setUserRetweeted(false);
        setRetweets((prevState) => prevState - 1);
        tweets[tweetIndex].retweets -= 1;
        mutate("tweets", tweets, false);
        fetcher(`tweets/${tweet._id}`, { action: "undoRetweet" });
      },
      REPLY: () => null,
      SHARE: () => null,
    };
    setHasActed(true);
    return actions[operation] ? actions[operation]() : null;
  };

  const actions = [
    {
      name: "reply",
      icon: (color: string) => renderIcon({ icon: "reply", color }),
      number: null,
      handler: () => tweetOperations("REPLY"),
    },
    {
      name: "retweet",
      icon: (color: string) => renderIcon({ icon: "retweet", color }),
      number: retweets,
      handler: () =>
        tweetOperations(userRetweeted ? "UNDO_RETWEET" : "RETWEET"),
    },
    {
      name: "like",
      icon: (color: string) => renderIcon({ icon: "like", color }),
      number: likes,
      handler: () =>
        tweetOperations(userLiked ? "UNDO_LIKE_TWEET" : "LIKE_TWEET"),
    },
    {
      name: "share",
      icon: (color: string) => renderIcon({ icon: "share", color }),
      number: null,
      handler: () => tweetOperations("SHARE"),
    },
  ];

  const handleStateColor = (actionName: string) => {
    const iconStateColor: { [key: string]: string } = {
      like: userLiked ? "#fa197f" : "#6d767c",
      retweet: userRetweeted ? "#00ba7c" : "#6d767c",
    };

    return iconStateColor[actionName] || "#6d767c";
  };

  useEffect(() => {
    if (hasActed) {
      mutate("tweets");
      setHasActed(false);
    }
  }, [hasActed]);

  useEffect(() => {
    if (tweet && user) {
      const liked = tweet?.likes?.includes(user._id);
      const retweeted = tweet?.retweets?.includes(user._id);
      setUserLiked(liked);
      setUserRetweeted(retweeted);
    }
  }, [tweet, user]);

  return (
    <Box
      sx={{
        "&:hover": {
          bg: "rgba(255, 255, 255, 0.03)",
        },
      }}
      padding="20px"
      borderBottom="1px solid"
      borderColor={borderColor}
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
              <Text fontWeight="small">{tweet?.content}</Text>
            </Box>
            {tweet?.imageSrc?.length ? (
              <Skeleton
                startColor="gray.500"
                endColor="gray.600"
                isLoaded={imageLoaded}
                borderRadius="12px"
              >
                <Box width="100%" height={imageLoaded ? "auto" : "max-content"}>
                  <Image
                    border="1px solid"
                    borderColor={borderColor}
                    src={tweet.imageSrc[0]}
                    borderRadius="12px"
                    width="100%"
                    onLoad={() => setImageLoaded(true)}
                  />
                </Box>
              </Skeleton>
            ) : null}
            <Box marginTop="20px" width="80%" fontSize="small">
              <Flex justifyContent="space-between" alignItems="center">
                {actions.map((action) => (
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
