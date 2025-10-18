import { Box, Image, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorMode } from "./ui/color-mode";
import type { IProduct } from "../interfaces";
import { truncateText } from "@/utils";


interface IProps {
  ProductCard: IProduct
}
const ProductCard = ({ ProductCard }: IProps) => {
  const {title ,description,price,thumbnail, documentId}= ProductCard
  const { url } = thumbnail

  const { colorMode } = useColorMode();

  return (
    <Box
      maxW={"sm"}
      mx={"auto"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      px={4}
      py={3}
      bg={colorMode === "light" ? "white" : "gray.900"}
      transition="0.3s"
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      height={"100%"}
      _hover={{
        transform: "scale(1.01)",
        boxShadow: "lg",
      }}
    >
      <Image
        src={`${import.meta.env.VITE_LOCAL_API}${url}`}
        alt="Product Image"
        mx="auto"
        boxSize="200px"
        objectFit="cover"
        borderRadius="md"
        border={".5px solid #cccccc4c"}
        shadow={"md"}
      />

      <VStack align="start" mt={6} p={3}>
        <Heading
          size="md"
          color={colorMode === "light" ? "teal.600" : "teal.300"}
        >
          {truncateText({text: title, limmit: 3})}
        </Heading>

        <Text
          color={colorMode === "light" ? "gray.600" : "gray.300"}
          fontSize="sm"
        >
          {truncateText({text: description, limmit: 15})}
        </Text>

        <Text
          fontWeight="bold"
          color={colorMode === "light" ? "teal.500" : "teal.200"}
          fontSize="lg"
        >
          { `$${price.toLocaleString("en-us")}` }
        </Text>

        <Link to={`/product/${documentId}`} style={{ width: "100%" }}>
          <Button
          alignContent={"center"}
            bg={colorMode === "light" ? "teal.500" : "teal.400"}
            color="white"
            size="md"
            w="full"
            borderRadius="md"
            _hover={{
              bg: colorMode === "light" ? "teal.600" : "teal.300",
            }}
          >
            View Details
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default ProductCard;
