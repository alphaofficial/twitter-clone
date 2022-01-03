import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "reset-css";
import "simplebar/dist/simplebar.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/date-picker.css";

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
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
