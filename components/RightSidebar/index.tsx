import { Box, Text, Center } from "@chakra-ui/layout";
import { Input, InputGroup, InputLeftElement, Spinner } from "@chakra-ui/react";
import { IoMdSearch } from "react-icons/io";
import { useAppTheme, useUsers } from "@/lib/hooks";
import UserFollowCard from "../UserFollowCard";

const RightSidebar = () => {
  const { users, isLoading } = useUsers();
  const { inputBackground, borderColor, itemBackground } = useAppTheme();

  return (
    <Box>
      <Box
        padding="20px"
        position="sticky"
        top="0"
        bg={itemBackground}
        backdropFilter="blur(12px)"
        width="100%"
        zIndex="1"
      >
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <IoMdSearch size={30} />
          </InputLeftElement>
          <Input
            bg={inputBackground}
            borderColor={borderColor}
            rounded="full"
            type="text"
            placeholder="Search Twitter"
          />
        </InputGroup>
      </Box>

      <Box padding="20px">
        <Box
          bg={inputBackground}
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
