import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import "reset-css";
import "simplebar/dist/simplebar.min.css";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  components: {
    Button: {
      variants: {
        link: {
          ":focus": {
            outline: "none",
            boxShadow: "none",
          },
        },
      },
    },
  },
  config,
});

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
