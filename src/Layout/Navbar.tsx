import { useEffect, useState } from "react";
import {Box,Flex,HStack,Button,IconButton,Spacer,Link as ChakraLink,Container,useDisclosure,VStack,} from "@chakra-ui/react";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import { navLinks } from "../constant";
import Logo from "../components/Logo";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const { open :isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgColor = useColorModeValue(
    isScrolled ? "rgba(50, 142, 131, 0.9)" : "#38b2ac",
    isScrolled ? "rgba(62, 135, 127, 0.9)" : "#38b2ac"
  );

  const linkColor = useColorModeValue("white", "gray.100");
  const hoverColor = useColorModeValue("#e0f2f1", "#a7f3d0");
  const buttonBg = useColorModeValue("white", "gray.700");
  const buttonColor = useColorModeValue("teal.600", "teal.200");
  const buttonHoverBg = useColorModeValue("gray.100", "gray.600");

  return (
    <Box bg={bgColor} position="fixed" top="0" left="0" right="0" zIndex="999" boxShadow="md" px={{ base: 4, md: 10 }} py={3} transition="all 0.3s ease">
      <Container>
        <Flex align="center" justifyContent={"space-between"} alignItems={"center"}>
          <Link to={"/"}>
            <Logo />
          </Link>

        <HStack px={"50px"} display={{ base: "none", md: "flex" }} alignItems="center">
        {navLinks.map((Link, idx) => {
          return (<ChakraLink key={idx} asChild color={linkColor} fontWeight="medium" _hover={{ color: hoverColor, textDecoration: "none" }}>
            <NavLink to={Link.path}>{Link.name}</NavLink>
          </ChakraLink>
              )})}
        </HStack>
        <Spacer />

        <HStack p={"15px"} alignItems="center">
          <ChakraLink asChild color={linkColor} fontWeight="medium" _hover={{ color: hoverColor, textDecoration: "none" }} display={{ base: "none", md: "block" }}>
            <Link to="/signin">Sign in</Link>
          </ChakraLink>
          <Link to="/signup">
            <Button bg={buttonBg} color={buttonColor} _hover={{ bg: buttonHoverBg }} size="sm" borderRadius="md" transition="all 0.2s">
            <Link to="/signup">Sign up</Link>
            </Button>
          </Link>

          <IconButton aria-label="Toggle color mode" onClick={toggleColorMode} color={linkColor} variant="ghost" fontSize="20px" _hover={{ color: hoverColor, bg: "rgba(255,255,255,0.1)" }}>
            {colorMode === "light" ? <FiMoon /> : <FiSun />}
          </IconButton>

          <IconButton aria-label="Menu" display={{ base: "flex", md: "none" }} color={linkColor} variant="ghost" fontSize="22px" onClick={isOpen ? onClose : onOpen}>
            {isOpen ? <FiX /> : <FiMenu />}
          </IconButton>
          </HStack>
        </Flex>

        {isOpen && (
          <VStack mt={4} p={4} align="start" display={{ base: "flex", md: "none" }}>
            {navLinks.map((link, idx) => (
            <ChakraLink key={idx} asChild color={linkColor} fontWeight="medium" _hover={{ color: hoverColor, textDecoration: "none" }}>
              <NavLink to={link.path}>{link.name}</NavLink>
            </ChakraLink>
            ))}
            
            <ChakraLink asChild color={linkColor} fontWeight="medium" _hover={{ color: hoverColor, textDecoration: "none" }}>
              <NavLink to="/signin">Sign in</NavLink>
            </ChakraLink>
            <ChakraLink asChild color={linkColor} fontWeight="medium" _hover={{ color: hoverColor, textDecoration: "none" }}>
              <NavLink to="/signup">Sign up</NavLink>
            </ChakraLink>
          </VStack>
        )}
      </Container>
    </Box>
  );
};

export default Navbar;
