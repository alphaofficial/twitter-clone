import { Box, Text } from "@chakra-ui/layout";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { IoMdSearch } from "react-icons/io";
import UserFollowCard from "../UserFollowCard";

const RightSidebar = () => {
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
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <IoMdSearch size={30} />
          </InputLeftElement>
          <Input
            bg="rgba(22, 24, 28, 1)"
            borderColor="rgba(22, 24, 28, 1)"
            rounded="full"
            type="text"
            placeholder="Search Twitter"
          />
        </InputGroup>
      </Box>

      <Box padding="20px">
        <Box
          bg="rgba(22, 24, 28, 1)"
          borderRadius="2xl"
          paddingY="10px"
          marginTop="20px"
        >
          <Box>
            <Box paddingX="20px">
              <Text fontSize="xl" fontWeight="bold">
                Who to follow
              </Text>
            </Box>
            {new Array(5).fill(0).map((_, index) => (
              <UserFollowCard
                name="tiny 🍑 keycap maker"
                avatar="https://bit.ly/dan-abramov"
                username="tinymakesthings"
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RightSidebar;
