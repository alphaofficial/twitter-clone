import { Box, Flex } from "@chakra-ui/layout";
import { Avatar, Button, Text } from "@chakra-ui/react";

const UserFollowCard = ({ name, username, avatar }) => {
  return (
    <Box
      marginTop="10px"
      paddingX="20px"
      paddingY="10px"
      sx={{
        "&:hover": {
          bg: "rgba(255,255,255,0.03)",
        },
      }}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Avatar name={name} src={avatar} />
        </Box>
        <Box>
          <Box>
            <Text
              sx={{
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
              fontSize="normal"
              fontWeight="semibold"
            >
              {name}
            </Text>
          </Box>
          <Box>
            <Text fontSize="small">@{username}</Text>
          </Box>
        </Box>
        <Box>
          <Button size="sm" rounded="full" bg="white" color="gray.900">
            Follow
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default UserFollowCard;
