import { Box, Text, Center } from "@chakra-ui/layout";
import { Input, InputGroup, InputLeftElement, Spinner } from "@chakra-ui/react";
import { User } from "@prisma/client";
import { IoMdSearch } from "react-icons/io";
import { useUsers } from "../../lib/hooks";
import UserFollowCard from "../UserFollowCard";

const RightSidebar = () => {
  const { users, isLoading } = useUsers();
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
            {isLoading ? (
              <Center width="100%">
                <Spinner />
              </Center>
            ) : (
              users.map((user: User) => (
                <UserFollowCard
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
