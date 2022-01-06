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
  FormHelperText,
} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import SimpleBar from "simplebar-react";
import { IoMdClose } from "react-icons/io";
import { Formik } from "formik";
import * as Yup from "yup";
import { auth } from "../lib/mutations";

type InitialValues = {
  email: string;
  password: string;
  username: string;
};

const initialValues: InitialValues = {
  email: "",
  password: "",
  username: "",
};

const FormValidation = Yup.object().shape({
  email: Yup.string().required("email is required").email("Invalid email"),
  password: Yup.string()
    .required("email is required")
    .min(6, "Password is too short - should be 6 chars minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/,
      "At least one uppercase letter, one lowercase letter, one number and one special character."
    ),
});
const CreateUserForm = ({ handleFormSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={FormValidation}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
      }) => (
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
                placeholder="Username"
                marginTop="20px"
                size="lg"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              <FormHelperText color="red.400">
                {errors.username && touched.username && errors.username}
              </FormHelperText>
            </FormControl>
            <FormControl>
              <Input
                type="text"
                placeholder="Email"
                marginTop="20px"
                size="lg"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <FormHelperText color="red.400">
                {errors.email && touched.email && errors.email}
              </FormHelperText>
            </FormControl>
            <FormControl>
              <Input
                type="password"
                placeholder="Password"
                marginTop="20px"
                size="lg"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <FormHelperText color="red.400">
                {errors.password && touched.password && errors.password}
              </FormHelperText>
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
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Done
            </Button>
          </Box>
        </Box>
      )}
    </Formik>
  );
};

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFormSubmit = async ({ values }: { values: InitialValues }) => {
    await auth("register", values);
  };
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
            <Box paddingLeft="4px" paddingTop="4px">
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
            <CreateUserForm handleFormSubmit={handleFormSubmit} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </SimpleBar>
  );
};

export default Home;
