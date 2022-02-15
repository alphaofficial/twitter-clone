import { Box, Text, Center } from "@chakra-ui/layout";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoMdSearch } from "react-icons/io";
import { useUsers } from "@/lib/hooks";
import UserFollowCard from "../UserFollowCard";

const RightSidebar = () => {
  const { users, isLoading } = useUsers();
  const borderColor = useColorModeValue("rgb(239, 243, 244)", "gray.800");
  const bg = useColorModeValue("white", "rgba(0, 0, 0, 0.65)");
  const inputBg = useColorModeValue("#f7f9f9", "rgba(22, 24, 28, 1)");
  return (
    <Box>
      <Box
        padding="20px"
        position="sticky"
        top="0"
        bg={bg}
        backdropFilter="blur(12px)"
        width="100%"
        zIndex="1"
      >
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <IoMdSearch size={30} />
          </InputLeftElement>
          <Input
            bg={inputBg}
            borderColor={borderColor}
            rounded="full"
            type="text"
            placeholder="Search Twitter"
          />
        </InputGroup>
      </Box>

      <Box padding="20px">
        <Box
          bg={inputBg}
          borderRadius="2xl"
          paddingY="10px"
          marginTop="20px"
          minHeight="250px"
        >
          <Box>
            <Box paddingX="20px">
              <Text fontSize="xl" fontWeight="bold">
                Who to follow
              </Text>
            </Box>
            {isLoading || !users ? (
              <Center width="100%" height="200">
                <Spinner />
              </Center>
            ) : (
              users?.map((user: any) => (
                <UserFollowCard
                  key={user.username}
                  name={`${user.firstname || "Jane"} ${user.lastname || "Doe"}`}
                  avatar={user.avatar}
                  username={user.username}
                />
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RightSidebar;
