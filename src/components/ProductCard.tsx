import { Box, Image, Heading, Text, Button, VStack, Flex, RatingGroup } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useColorMode } from "./ui/color-mode";
import type { ICartItem } from "../interfaces";
import { truncateText, truncateTitle } from "@/utils";
import { addCartItmesAction } from "@/app/features/cart/cartSlice"
import { useAppDispatch } from "@/app/store";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaEye, FaHeart  } from "react-icons/fa";
import { useState } from "react";
import CookiesServices from "../Services"


interface IProps {
  ProductCard: ICartItem
}

const ProductCard = ({ ProductCard }: IProps) => {
  const token = CookiesServices.get("jwt")

  const {title ,description,price,thumbnail, documentId, discount, rating, stock}= ProductCard
  const navigate = useNavigate();
  const { url } = thumbnail
  const [liked, setLiked] = useState(false);
  const { colorMode } = useColorMode();
      const dispatch = useAppDispatch()
    const addCart = () => {
      if(!token) {
        navigate("/signin");
        return
      }
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
      pb={3}
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
      position={"relative"}
    >
      <Flex flexDirection={"column"} gap={3} position={"absolute"} right={"10px"} top={"20px"}>
      <Button
        colorScheme={"teal"}
        alignContent={"center"}
        bg={colorMode === "light" ? "transparent" : "transparent"}
        color="white"
        w="fit-content"
        p={0}
        borderRadius="full"
        onClick={() => setLiked(!liked)}
        _hover={{
          bg: colorMode === "light" ? "transparent" : "transparent",
        }}>
          <FaHeart style={{color: liked ? "#EF4444" : "#9e9e9eff",transition: "0.3s",fontSize: "30px"}}/>
        </Button>
        <Link
          to={`/product/${documentId}`}>
            <Button
              colorScheme={"teal"}
              alignContent={"center"}
              bg={colorMode === "light" ? "transparent" : "transparent"}
              color="white"
              w="fit-content"
              p={0}
              borderRadius="full"
              _hover={{
                bg: colorMode === "light" ? "transparent" : "transparent",
              }}>
              <Box as={FaEye} boxSize={"25px"} color={"gray.300"}></Box>
            </Button>
          </Link>
      </Flex>
      <Image
        src={`${url}`}
        alt={title}
        mx="auto"
        boxSize="200px"
        objectFit="cover"
        borderRadius="md"
        border={".5px solid #cccccc4c"}
        shadow={"md"}
        loading="lazy"
      />
      <VStack align="start" mt={6} p={3}>
        <Heading
          size="md"
          color={colorMode === "light" ? "teal.600" : "teal.300"}
        >
          {truncateTitle({text: title, limmit: 2})}
        </Heading>

        <Text
          color={colorMode === "light" ? "gray.600" : "gray.300"}
          fontSize="sm"
        >
          {truncateText({text: description, limmit: 15})}
        </Text>
        <Flex mt="1">
          <RatingGroup.Root colorPalette="yellow" readOnly count={5} defaultValue={rating} size="md">
            <RatingGroup.HiddenInput />
            <RatingGroup.Control />
          </RatingGroup.Root>
          <Text ml={"3px"}>{rating}</Text>
          <Text ml={"3px"} color={colorMode === "light" ? "teal.600" : "teal.300"}>{`(${stock})`}</Text>
        </Flex>
        {discount ? <>
          <Box bg={"red.500"} color={"white"} borderRadius={"md"} position={"absolute"} top={"10px"} left={"-3px"} py={"3px"} px={"10px"}>
            %{discount}
          </Box>
        </> : null}
        <Flex justifyContent={"space-between"} w={"full"} alignItems={"center"}>
                    {discount ? (
            <Text fontWeight="bold" fontSize="lg">
              <span style={{color: colorMode === "light" ? "#319795" : "#81E6D9",marginRight: "8px",}}>
                    {`$${(price * (1 - discount / 100)).toFixed(2)}`}
              </span>
              <span style={{ textDecoration: "line-through", color: colorMode === "light" ? "gray" : "#A0AEC0", fontSize: "0.9rem",}}>
                  {`$${price.toFixed(2)}`}
              </span>
            </Text>
          ) : (
          <Text fontWeight="bold" color={colorMode === "light" ? "teal.500" : "teal.200"} fontSize="lg">
            {`$${price.toFixed(2)}`}
          </Text>)}
          <Link to={``}>
            <Button
              colorScheme={"teal"}
              alignContent={"center"}
              bg={colorMode === "light" ? "teal.600" : "teal.700"}
              color="white"
              p={0}
              borderRadius="full"
              _hover={{
                bg: colorMode === "light" ? "teal.700" : "teal.400",
              }}
            onClick={addCart}>
                <Box as={IoAddCircleOutline} boxSize="30px"/>
            </Button>
          </Link>
        </Flex>
      </VStack>
    </Box>
  );
};

export default ProductCard;