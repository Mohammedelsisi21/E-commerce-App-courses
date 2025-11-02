import { Box, Flex, Heading, Text, VStack, HStack, Icon, IconButton, Drawer, useDisclosure, Portal, CloseButton, VisuallyHidden,} from "@chakra-ui/react";
import { FiHome, FiBox, FiTag, FiSun, FiMoon, FiMenu } from "react-icons/fi";
import React from "react";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import { Link, Outlet } from "react-router-dom";
import Logo from "@/components/myUi/Logo";
import  CookiesServices from "@/Services"
import { AiOutlineLogout } from "react-icons/ai";
import { LuBell } from "react-icons/lu";
const SidebarItem = ({
  icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) => {
  const hoverBg = useColorModeValue("teal.800", "teal.900");
  const color = useColorModeValue("white", "teal.500");
  const iconColor = useColorModeValue("white", "teal.300");

  return (
    <HStack p={3} px={4} py={2} borderRadius="md" cursor="pointer" transition="all 0.2s" _hover={{bg: hoverBg,   transform: "translateX(5px)", }}>
      <Icon as={icon} fontSize="20px" color={iconColor} />
      <Text fontSize="md" color={color} fontWeight="medium">
        {label}
      </Text>
    </HStack>
  );
};

const token = CookiesServices.get("jwt_Admin")
const onLogout = () => {
  CookiesServices.remove("jwt_Admin",  '/' )
  location.replace("/dashboard/login")
}

const LayoutDashboard= () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { open, onOpen, onClose } = useDisclosure();

  const bg = useColorModeValue("gray.100", "gray.900");
  const sidebarBg = useColorModeValue("teal.600", "gray.800");
  const contentBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const titleColor = useColorModeValue("teal.600", "teal.300");

  const sidebarContent = (
    <VStack align="stretch" p={2} mt={4}>
      <Link to={"/dashboard"}>
        <SidebarItem icon={FiHome} label="Home" />
      </Link>
      <Link to={"/dashboard/products"}>
        <SidebarItem icon={FiBox} label="Products" />
      </Link>
      <Link to={"/dashboard/categories"}>
        <SidebarItem icon={FiTag} label="Categories" />
      </Link>
    </VStack>
  );

  return (
    <Flex minH="100vh" bg={bg}>
      <Box w="250px" bg={sidebarBg}  borderRight="1px" borderColor={borderColor} pt={"20px"} boxShadow="md" display={{ base: "none", md: "block" }}>
        <Heading size="md" pb={"30px"} borderBottom={`solid 1px ${colorMode === "dark"? "" : "white"}`} color={titleColor}>
          <Link to={"/dashboard"}>
            <Logo hdash="40px"/>
          </Link>
        </Heading>
        {sidebarContent}
      </Box>
      <Drawer.Root placement="start" onOpenChange={onClose} open={open}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content bg={sidebarBg} borderRightWidth="1px" boxShadow="lg">
            <Drawer.Header borderBottomWidth="1px">
              <Heading size="md">
                <Link to="/dashboard">
                  <Logo />
                </Link>
              </Heading>
            </Drawer.Header>
            <Drawer.Body>{sidebarContent}</Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton position="absolute" top="10px" right="10px" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
      </Drawer.Root>
      <Flex flex="1" direction="column" py={"30px"} bg={contentBg}>
        <Flex justify="space-between" px={{base: "4px", md: "40px"}} py={"10px"} borderBottom={"solid 2px"} align="center" mb={6}>
          <Flex align="center" gap={2}>
            <IconButton
              aria-label="Open menu"
              variant="ghost"
              colorScheme="teal"
              display={{ base: "flex", md: "none" }}
              onClick={onOpen}
            >
              <FiMenu />
            </IconButton>
            <Heading size="lg" color={titleColor}>
              Admin Dashboard
            </Heading>
          </Flex>
          <Flex gap={"10px"} alignItems={"center"}>
              <LuBell size={25}/><VisuallyHidden>Notifications</VisuallyHidden>
            {token && (
              <Box onClick={onLogout} color={colorMode === "dark" ? "white" : "black"} fontWeight="medium">
                <Link to={"/logout"}>
                  <Flex direction="column" align="center">
                    <Icon as={AiOutlineLogout} boxSize={6} mb={1} />
                  </Flex>
                </Link>
              </Box>
            )}
            <IconButton aria-label="Toggle theme" onClick={toggleColorMode} variant="ghost" colorScheme="teal" _hover={{ bg: useColorModeValue("teal.100", "teal.800") }}>
              {colorMode === "light" ? <FiMoon /> : <FiSun />}
            </IconButton>
          </Flex>
        </Flex>
        <Box
          border="1px"
          borderColor={borderColor}
          p={6}
          flex="1">
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};

export default LayoutDashboard;
