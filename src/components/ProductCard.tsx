import { Box, Image, Heading, Text, Button, VStack, Flex, RatingGroup } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorMode } from "./ui/color-mode";
import type { ICartItem } from "../interfaces";
import { truncateText } from "@/utils";
import { addCartItmesAction } from "@/app/features/cart/cartSlice"
import { useAppDispatch } from "@/app/store";

interface IProps {
  ProductCard: ICartItem
}
const ProductCard = ({ ProductCard }: IProps) => {
  const {title ,description,price,thumbnail, documentId, discount, rating}= ProductCard
  const { url } = thumbnail

  const { colorMode } = useColorMode();
      const dispatch = useAppDispatch()
    const addCart = () => {
        dispatch(addCartItmesAction(ProductCard))
    }

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
        alt={title}
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

        <Flex justifyContent={"space-between"} w={"100%"}>
          {discount ? (
            <Text fontWeight="bold" fontSize="lg">
              <span style={{color: colorMode === "light" ? "#319795" : "#81E6D9",marginRight: "8px",}}>
                    {`$${(price * (1 - discount / 100)).toLocaleString("en-us")}`}
              </span>
              <span style={{ textDecoration: "line-through", color: colorMode === "light" ? "gray" : "#A0AEC0", fontSize: "0.9rem",}}>
                  {`$${price.toLocaleString("en-us")}`}
              </span>
            </Text>
          ) : (
          <Text fontWeight="bold" color={colorMode === "light" ? "teal.500" : "teal.200"} fontSize="lg">
            {`$${price.toLocaleString("en-us")}`}
          </Text>)}
          
        <RatingGroup.Root colorPalette="teal" readOnly count={5} defaultValue={rating} size="xs">
          <RatingGroup.HiddenInput />
          <RatingGroup.Control />
        </RatingGroup.Root>

        </Flex>
        <Flex justifyContent={"space-evenly"} w={"full"}>
          <Link to={`/product/${documentId}`} style={{ width: "45%"}}>
            <Button
              colorScheme={"teal"}
              alignContent={"center"}
              bg={colorMode === "light" ? "teal.700" : "teal.500"}
              color="white"
              size="md"
              w="full"
              borderRadius="md"
              _hover={{
                bg: colorMode === "light" ? "teal.800" : "teal.400",
              }}>
              View Details
            </Button>
          </Link>
          <Link to={``} style={{ width: "45%" }}>
            <Button
              colorScheme={"teal"}
              alignContent={"center"}
              bg={colorMode === "light" ? "teal.700" : "teal.500"}
              color="white"
              size="md"
              w="full"
              borderRadius="md"
              _hover={{
                bg: colorMode === "light" ? "teal.800" : "teal.400",
              }}
            onClick={addCart}>
                Add to cart
            </Button>
          </Link>
        </Flex>
      </VStack>
    </Box>
  );
};

export default ProductCard;
