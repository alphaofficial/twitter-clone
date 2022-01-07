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
import {
  Button,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import SimpleBar from "simplebar-react";
import { SyntheticEvent, useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { isValidEmail } from "../../lib/validators";
import { auth } from "../../lib/mutations";

const Login = () => {
  const [email, setEmail] = useState("alphaxsalt@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await auth("login", { email, password });
    setIsLoading(false);
    router.push("/home");
  };

  const renderPasswordIcon = (visible: boolean) => {
    if (visible) {
      return <AiOutlineEyeInvisible size={25} height="100%" />;
    }
    return <AiOutlineEye size={25} height="100%" />;
  };
  const stepOne = () => (
    <Box marginTop="20px" paddingX="30px">
      <Flex justifyContent="center" alignItems="center">
        <Box width="80%">
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
              placeholder="email address"
              size="lg"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              isInvalid={!isValidEmail(email)}
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
                fontWeight="bold"
                color="black"
                disabled={email.length === 0 || !isValidEmail(email)}
                onClick={() => {
                  setCurrentStep(2);
                }}
              >
                Next
              </Button>
            </Box>
            <Box marginTop="20px" marginBottom="30px">
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
  );

  const stepTwo = () => (
    <Box marginTop="20px" paddingX="30px">
      <Flex alignItems="center">
        <Box width="100%" paddingX="20px">
          <Box marginBottom="40px" marginTop="20px">
            <Text fontSize="2xl" fontWeight="extrabold">
              Enter your password
            </Text>
          </Box>
          <Flex height="100%" direction="column" justifyContent="space-between">
            <Box>
              <Box>
                <Input
                  type="text"
                  placeholder="phone, email address or username"
                  size="lg"
                  value={email}
                  isDisabled
                />
              </Box>
              <Box marginTop="20px">
                <InputGroup alignItems="center">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    size="lg"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label="toggle password visibility"
                      variant="ghost"
                      sx={{
                        "&:hover": {
                          bg: "transparent",
                        },
                      }}
                      onClick={() => setShowPassword((prevState) => !prevState)}
                    >
                      {renderPasswordIcon(showPassword)}
                    </IconButton>
                  </InputRightElement>
                </InputGroup>
              </Box>
            </Box>
            <Box marginTop="40%">
              <Button
                type="submit"
                width="100%"
                bg="gray.100"
                sx={{
                  "&:hover": {
                    bg: "gray.300",
                  },
                }}
                rounded="full"
                fontWeight="bold"
                color="black"
                disabled={password.length === 0}
                onClick={() => {
                  setCurrentStep(2);
                }}
                isLoading={isLoading}
              >
                Log in
              </Button>
              <Box marginTop="20px">
                <Flex alignItems="center">
                  <Text fontSize="small">Don&apos;t have an account? </Text>
                  <LinkBox>
                    <NextLink href="/" passHref>
                      <LinkOverlay>
                        <Text color="blue.400" fontSize="small">
                          Sign up
                        </Text>
                      </LinkOverlay>
                    </NextLink>
                  </LinkBox>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );

  const renderStep = (step) => {
    switch (step) {
      case 1:
        return stepOne();
      case 2:
        return stepTwo();
      default:
        break;
    }
  };

  return (
    <Box width="100vw" minHeight="100vh" bg="gray.700">
      <SimpleBar>
        <Box height="100vh">
          <Flex height="100%" justifyContent="center" alignItems="center">
            <Box
              minW={["80%", "80%", "50%", "35%"]}
              bg="black"
              rounded="xl"
              color="white"
              padding="20px"
              position="relative"
              minHeight="40%"
              overFlowY="auto"
            >
              <Box>
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
                <form onSubmit={handleSubmit}>{renderStep(currentStep)}</form>
              </Box>
            </Box>
          </Flex>
        </Box>
      </SimpleBar>
    </Box>
  );
};

export default Login;
