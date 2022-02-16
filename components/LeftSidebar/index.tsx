import { Box, Flex, LinkBox, LinkOverlay, Text } from "@chakra-ui/layout";
import NextImage from "next/image";
import NextLink from "next/link";
import { FiHome, FiBell, FiHash } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { FaRegEnvelope, FaBookmark } from "react-icons/fa";
import { BsCardText } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Avatar, Button, useColorModeValue } from "@chakra-ui/react";
import { useUser } from "@/lib/hooks";

const LeftSidebar = () => {
  const { user } = useUser();
  const twitterSrc = useColorModeValue("/twitter-blue.png", "/twitter.png");
  const menuItems = [
    {
      name: "Home",
      icon: <FiHome size={24} />,
      link: "/home",
    },
    {
      name: "Explore",
      icon: <FiHash size={24} />,
      link: "/home",
      // link: "/explore",
    },
    {
      name: "Notifications",
      icon: <FiBell size={24} />,
      link: "/home",
      // link: "/notifications",
    },
    {
      name: "Messages",
      icon: <FaRegEnvelope size={24} />,
      link: "/home",
      // link: "/messages",
    },
    {
      name: "Bookmarks",
      icon: <FaBookmark size={24} />,
      link: "/home",
      // link: "/bookmarks",
    },
    {
      name: "Lists",
      icon: <BsCardText size={24} />,
      link: "/home",
      // link: "/lists",
    },
    {
      name: "Profile",
      icon: <BiUser size={24} />,
      link: "/home",
      // link: "/profile",
    },
    {
      name: "More",
      icon: <CgMoreO size={24} />,
      link: "/home",
      // link: "/more",
    },
  ];
  const hoverColor = useColorModeValue(
    "rgba(15,20,21,0.1)",
    "rgba(217,217,217,0.1)"
  );
  const btnColor = useColorModeValue("white", "black");
  return (
    <Box paddingTop="20px" height="100vh" position="relative">
      <Box marginBottom="20px">
        <Box paddingY="10px" paddingX="15px">
          <NextImage src={twitterSrc} width={25} height={25} />
        </Box>
        <Box marginTop="10px">
          {menuItems.map((item) => (
            <LinkBox
              key={item.name}
              marginBottom="10px"
              paddingY="10px"
              paddingX="15px"
              width="max-content"
              sx={{
                "&:hover": {
                  bg: hoverColor,
                  borderRadius: "24px",
                },
              }}
            >
              <NextLink href={item.link} passHref>
                <LinkOverlay>
                  <Flex alignItems="center">
                    {item.icon}
                    <Text fontSize="xl" ml="20px">
                      {item.name}
                    </Text>
                  </Flex>
                </LinkOverlay>
              </NextLink>
            </LinkBox>
          ))}
        </Box>
        <Box width="200px" marginTop="20px">
          <Button
            bg="twitter.500"
            size="lg"
            rounded="full"
            width="100%"
            fontWeight="bold"
            sx={{
              "&:hover": {
                bg: "twitter.700",
              },
            }}
            color={btnColor}
          >
            Tweet
          </Button>
        </Box>
      </Box>
      <Box position="absolute" bottom="40px">
        <Flex alignItems="center">
          <Avatar name="Dan Abrahmov" src={user?.avatar} />
          <Box ml="10px">
            <Text fontSize="20px" color="gray.500">
              @{user?.username || ""}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default LeftSidebar;
