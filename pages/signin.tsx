import { Box, Divider, Flex, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import NextImage from "next/image";

const Signin = () => {
  return (
    <Box bg="black" height="100vh" width="100vw" color="white">
      <Flex justifyContent="space-between" height="100%">
        <Box bg="blue.400" width="55%" padding="20px">
          <Flex justifyContent="center" height="100%" alignItems="center">
            <Box>
              <NextImage src="/twitter.png" height={200} width={200} />
            </Box>
          </Flex>
        </Box>
        <Box width="45%" paddingTop="10%" paddingX="40px">
          <Box>
            <NextImage src="/twitter.png" height={35} width={35} />
          </Box>
          <Box marginTop="30px">
            <Text color="gray.400" fontSize="7xl" fontWeight="extrabold">
              Happening now
            </Text>
          </Box>
          <Box marginTop="20px">
            <Text color="gray.400" fontWeight="extrabold" fontSize="4xl">
              Join Twitter today.
            </Text>
          </Box>
          <Box marginTop="30px" width="350px">
            <Stack spacing={3} direction="column" align="center">
              <Button
                width="100%"
                bg="gray.100"
                sx={{
                  "&:hover": {
                    bg: "gray.300",
                  },
                }}
                rounded="full"
              >
                <Text color="black">Sign up with Google</Text>
              </Button>
              <Button
                width="100%"
                bg="gray.100"
                sx={{
                  "&:hover": {
                    bg: "gray.300",
                  },
                }}
                rounded="full"
              >
                <Text fontWeight="bold" color="black">
                  Sign up with Apple
                </Text>
              </Button>
              <Button
                type="button"
                width="100%"
                sx={{
                  "&:hover": {
                    bg: "blue.500",
                  },
                }}
                bg="blue.400"
                rounded="full"
              >
                <Text fontWeight="bold">Sign up with phone or email</Text>
              </Button>
              <Box>
                <Text color="gray.600" fontSize="small">
                  By signing up, you agree to the Terms of Service and Privacy
                  Policy, including using cookies
                </Text>
              </Box>
            </Stack>
            <Box marginTop="50px">
              <Box marginBottom="20px">
                <Text color="gray.400" fontSize="md" fontWeight="bold">
                  Already have an account?
                </Text>
              </Box>
              <Button
                type="button"
                width="100%"
                sx={{
                  "&:hover": {
                    bg: "blue.500",
                    color: "white",
                  },
                }}
                bg="transparent"
                border="1px solid"
                borderColor="gray.700"
                rounded="full"
                color="blue.500"
                fontWeight="bold"
              >
                Sign in
              </Button>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Signin;
