import { Box, Flex, Text } from "@chakra-ui/layout";
import { Avatar, Image } from "@chakra-ui/react";
import { BsChatRight } from "react-icons/bs";
import { AiOutlineRetweet } from "react-icons/ai";
import { FiShare, FiHeart } from "react-icons/fi";

const Tweet = ({
  tweet,
}: {
  tweet: {
    name: string;
    src: string;
    username: string;
    content: string;
    // eslint-disable-next-line react/require-default-props
    imageSrc?: string;
  };
}) => {
  const actions = [
    {
      name: "reply",
      icon: <BsChatRight size={15} />,
    },
    {
      name: "retweet",
      icon: <AiOutlineRetweet size={15} />,
    },
    {
      name: "like",
      icon: <FiHeart size={15} />,
    },
    {
      name: "share",
      icon: <FiShare size={15} />,
    },
  ];

  return (
    <Box
      sx={{
        _first: {
          marginTop: "20%",
        },
      }}
      padding="20px"
      borderBottom="2px solid"
      borderColor="gray.800"
    >
      <Box>
        <Flex>
          <Box mr="15px">
            <Avatar name={tweet.name} src={tweet.src} />
          </Box>
          <Box width="100%">
            <Box fontWeight="bold">@{tweet.username}</Box>
            <Box marginBottom="15px">
              <Text fontWeight="normal">{tweet.content}</Text>
            </Box>
            {tweet?.imageSrc && (
              <Box>
                <Image src={tweet.imageSrc} borderRadius="12px" width="100%" />
              </Box>
            )}
            <Box marginTop="20px">
              <Flex justifyContent="space-between" alignItems="center">
                {actions.map((action) => (
                  <Flex key={action.name} alignItems="center" color="gray.500">
                    {action.icon}
                    <Box ml="5px">
                      <Text>9</Text>
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
