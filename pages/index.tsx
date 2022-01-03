/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Box,
  Flex,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from "@chakra-ui/layout";
import {
  Button,
  ModalBody,
  ModalOverlay,
  Modal,
  ModalContent,
  useDisclosure,
  IconButton,
  Image,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import SimpleBar from "simplebar-react";
import { IoMdClose } from "react-icons/io";
import DatePicker from "react-datepicker";
import { useState } from "react";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dob, setDob] = useState(new Date());
  return (
    <SimpleBar>
      <Box bg="black" minHeight="100vh" width="100vw" color="white">
        <Flex justifyContent="space-between" height="100%">
          <Box bg="twitter.600" width="55%" minHeight="100vh" padding="20px">
            <Flex justifyContent="center" height="100%" alignItems="center">
              <Box>
                <NextImage src="/twitter.png" height={200} width={200} />
              </Box>
            </Flex>
          </Box>
          <Box
            width="45%"
            minHeight="100vh"
            overflow="scroll"
            paddingTop="10%"
            paddingX="40px"
            paddingBottom="20px"
          >
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
                      bg: "twitter.700",
                    },
                  }}
                  bg="twitter.600"
                  rounded="full"
                  fontWeight="bold"
                  onClick={onOpen}
                >
                  Sign up with phone or email
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
                        color="twitter.600"
                        fontWeight="bold"
                      >
                        Sign in
                      </Button>
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay bg="rgba(91, 112, 131, 0.4);" />
        <ModalContent bg="black" color="white" paddingBottom="40px">
          <Box position="relative">
            <Box paddingLeft="4px">
              <IconButton
                aria-label="close-modal-button"
                variant="ghost"
                sx={{
                  "&:hover": {
                    bg: "transparent",
                  },
                }}
                onClick={onClose}
              >
                <IoMdClose size={30} />
              </IconButton>
            </Box>
            <Box position="absolute" left="48%" top="10px">
              <Image src="/twitter.png" width={30} height={30} />
            </Box>
          </Box>

          <ModalBody>
            <Box>
              <Box marginTop="20px">
                <Text fontSize="xl" fontWeight="bold">
                  Create your account
                </Text>
              </Box>
              <Box marginTop="20px">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Name"
                    marginTop="20px"
                    size="lg"
                  />
                </FormControl>
                <FormControl marginTop="20px">
                  <Input
                    type="text"
                    placeholder="Email"
                    marginTop="20px"
                    size="lg"
                  />
                </FormControl>
                <FormControl marginTop="20px">
                  <FormLabel htmlFor="dob">Date of birth</FormLabel>
                  <FormHelperText marginBottom="10px">
                    This will not be shown publicly. Confirm your own age, even
                    if this account is for a business, a pet, or something else.
                  </FormHelperText>
                  <DatePicker
                    id="dob"
                    selected={dob}
                    onChange={(date) => setDob(date)}
                    showPopperArrow={false}
                    className="react-datapicker__input-text"
                  />
                </FormControl>
              </Box>
              <Box marginTop="40px">
                <Button
                  bg="twitter.600"
                  sx={{
                    "&:hover": {
                      bg: "twitter.700",
                    },
                  }}
                  rounded="full"
                  width="100%"
                  //disabled
                >
                  Next
                </Button>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </SimpleBar>
  );
};

export default Home;
