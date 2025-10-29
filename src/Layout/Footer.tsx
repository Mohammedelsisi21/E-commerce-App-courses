import { useColorMode } from "@/components/ui/color-mode";
import Logo from "../components/myUi/Logo";
import { Box, Flex, Grid, GridItem, Heading, Text, HStack, Icon, Container } from "@chakra-ui/react";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
    const { colorMode }= useColorMode()
return (
    <Box bg={`${colorMode == "dark" ? "teal.800" : "#fff"}`} color={`${colorMode == "light" ? "#000" : "#fff/50"}`} py={10} borderTop={`2px solid ${colorMode == "light" ? "#333" : "#eee"}`} mt={10}>
        <Container>
            <Grid templateColumns={{ base: "1fr", md: "3fr 1fr 1fr 1fr" }} gap={10} maxW="6xl" mx="auto" px={{ base: 5, md: 0 }}>
                <GridItem>
                    <HStack mb={3}>
                        <Logo style={colorMode === 'light' ? true : false}/>
                    </HStack>

                    <Text fontSize="sm" color={`${colorMode === 'light' ? "gray.500" : "white/50"}`} mb={4}>
                        Fresh Cart is a Versitle E-commerce platform offering a wide range of products,
                        from clothes to electronics; it provides a user-friendly experience for seamless
                        shopping across diverse categories.
                    </Text>

                    <HStack p={4}>
                        <Link to="https://www.facebook.com/" target="_blank">
                            <Icon as={FaFacebookF} fontSize="20px" color="#1877F2" _hover={{ color: "#145DBF", transform: "scale(1.1)"}} transition="all 0.2s"/>
                        </Link>

                        <Link to="https://x.com" target="_blank">
                            <Icon as={FaTwitter} fontSize="20px" color="#1DA1F2" _hover={{ color: "#0d8ddb", transform: "scale(1.1)"}}transition="all 0.2s"/>
                        </Link>

                        <Link to="https://www.instagram.com/" target="_blank">
                            <Icon as={FaInstagram} fontSize="20px" color="#E4405F" _hover={{ color: "#C13584", transform: "scale(1.1)" }} transition="all 0.2s"/>
                        </Link>

                        <Link to="https://www.pinterest.com/" target="_blank">
                            <Icon as={FaPinterestP} fontSize="20px" color="#E60023" _hover={{ color: "#B8001C", transform: "scale(1.1)" }} transition="all 0.2s"/>
                        </Link>
                    </HStack>
                </GridItem>

                <GridItem>
                    <Heading size="sm" mb={4} color={`${colorMode == "light" ? "#000" : "#fff"}`}>
                        Categories
                    </Heading>
                    <Flex direction="column" gap={2}>
                        <Link to={"/"}><Text _hover={{color: "white"}}>Men's Fashion</Text></Link>
                        <Link to={"/"}><Text _hover={{color: "white"}}>Women's Fashion</Text></Link>
                        <Link to={"/"}><Text _hover={{color: "white"}}>Baby & Toys</Text></Link>
                        <Link to={"/"}><Text _hover={{color: "white"}}>Beauty & Health</Text></Link>
                        <Link to={"/"}><Text _hover={{color: "white"}}>Electronics</Text></Link>
                    </Flex>
                </GridItem>

                <GridItem>
                    <Heading size="sm" mb={4} color={`${colorMode == "light" ? "#000" : "#fff"}`}>
                        Quick Links
                    </Heading>
                    <Flex direction="column" gap={2} >
                        <Link to={"/"}><Text _hover={{color: "white"}}>About Us</Text></Link>
                        <Link to={"/"}><Text _hover={{color: "white"}}>Contact Us</Text></Link>
                        <Link to={"/"}><Text _hover={{color: "white"}}>Privacy Policy</Text></Link>
                        <Link to={"/"}><Text _hover={{color: "white"}}>Terms of Services</Text></Link>
                        <Link to={"/"}><Text _hover={{color: "white"}}>Shipping Policy</Text></Link>
                    </Flex>
                </GridItem>

                <GridItem>
                    <Heading size="sm" mb={4} color={`${colorMode == "light" ? "#000" : "#fff"}`}>
                        Customer Service
                    </Heading>
                    <Flex direction="column" gap={2}>
                        <Link to={"/"}><Text _hover={{color: "white"}}>Account</Text></Link>
                        <Link to={"/"}><Text _hover={{color: "white"}}>My Orders</Text></Link>
                        <Link to={"/"}><Text _hover={{color: "white"}}>Wishlist</Text></Link>
                        <Link to={"/"}><Text _hover={{color: "white"}}>Returns & Refunds</Text></Link>
                        <Link to={"/"}><Text _hover={{color: "white"}}>Help Center</Text></Link>
                    </Flex>
                </GridItem>
            </Grid>

        <Box borderTop="1px solid #e5e5e5" mt={10} pt={5}>
            <Flex maxW="6xl" mx="auto" justify="space-between" align="center" px={{ base: 5, md: 0 }} flexDirection={{ base: "column", md: "row" }} gap={3}>
                <Text fontSize="sm" color={`${colorMode == "light" ? "#000" : "#fff"}`}>
                    © 2025 Fresh Cart. All Rights Reserved.
                </Text>
            <Icon as={FiShoppingCart} color={`${colorMode == "light" ? "#000" : "white"}`} fontSize="20px" />
            </Flex>
        </Box>
    </Container>
    </Box>
  );
};

export default Footer;
