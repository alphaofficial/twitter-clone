import {
  Box,
  Flex,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { IoMdClose } from "react-icons/io";
import NextLink from "next/link";
import { Button, Image, Input } from "@chakra-ui/react";
import SimpleBar from "simplebar-react";

const Login = () => {
  return (
    <SimpleBar>
      <Box width="100vw" minHeight="100vh" bg="gray.700" paddingY="60px">
        <Box height="100vh">
          <Flex height="100%" justifyContent="center" alignItems="center">
            <Box
              width="35%"
              minW={["100%", "100%", "50%", "35%"]}
              height="650px"
              overFlowY="scroll"
              bg="black"
              rounded="xl"
              color="white"
              padding="20px"
              position="relative"
            >
              <SimpleBar>
                <Box>
                  <LinkBox>
                    <NextLink href="/" passHref>
                      <LinkOverlay>
                        <IoMdClose size={20} color="white" />
                      </LinkOverlay>
                    </NextLink>
                  </LinkBox>
                </Box>
                <Box position="absolute" left="48%" top="18px">
                  <Image src="/twitter.png" width={30} height={30} />
                </Box>
                <Box marginTop="20px" paddingX="30px">
                  <Flex justifyContent="center" alignItems="center">
                    <Box width="60%">
                      <Box marginBottom="40px" marginTop="20px">
                        <Text fontSize="2xl" fontWeight="extrabold">
                          Sign in to Twitter
                        </Text>
                      </Box>
                      <Stack spacing={6} direction="column" align="center">
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
                      </Stack>
                      <Box marginY="20px">
                        <Text textAlign="center">or</Text>
                      </Box>
                      <Box>
                        <Input
                          type="text"
                          placeholder="phone, email address or username"
                          size="lg"
                        />
                        <Box marginTop="20px">
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
                              Next
                            </Text>
                          </Button>
                        </Box>
                        <Box marginTop="20px">
                          <LinkBox>
                            <NextLink href="/login" passHref>
                              <LinkOverlay>
                                <Button
                                  type="button"
                                  width="100%"
                                  sx={{
                                    "&:hover": {
                                      bg: "gray.900",
                                    },
                                  }}
                                  bg="transparent"
                                  border="1px solid"
                                  borderColor="gray.700"
                                  rounded="full"
                                  color="white"
                                  fontWeight="bold"
                                >
                                  Forgot password?
                                </Button>
                              </LinkOverlay>
                            </NextLink>
                          </LinkBox>
                        </Box>
                      </Box>
                    </Box>
                  </Flex>
                </Box>
              </SimpleBar>
            </Box>
          </Flex>
        </Box>
      </Box>
    </SimpleBar>
  );
};

export default Login;
