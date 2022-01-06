import { Box, Text } from "@chakra-ui/layout";
import NextImage from "next/image";

const LeftSidebar = () => {
  const menuItems = {
    name: "Home",
    icon: "",
    link: "/home",
  };
  return (
    <Box paddingTop="20px">
      <Box marginBottom="20px">
        <NextImage src="/twitter.png" width={30} height={30} />
      </Box>
    </Box>
  );
};

export default LeftSidebar;
