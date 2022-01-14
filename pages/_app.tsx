import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "reset-css";
import "simplebar/dist/simplebar.min.css";
import Head from "next/head";

const theme = extendTheme({
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
});

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta name="viewport" content="width=1280, user-scalable=yes" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
