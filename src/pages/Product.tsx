import { Link, useNavigate, useParams } from "react-router-dom"
import useAuthenticatedQuery from "../hooks"
import { Box, Button, Flex, Heading, Image, RatingGroup, Text, VStack } from "@chakra-ui/react"
import { useColorMode } from "@/components/ui/color-mode"
import type { IProduct } from "@/interfaces"
import { useEffect, useState } from "react"
import { BsArrowLeft } from "react-icons/bs"
import ProductDetailsSkeleton from "@/components/skeleton/ProductDetailsSkeleton"
import { useAppDispatch } from "@/app/store"
import { addCartItmesAction } from "@/app/features/cart/cartSlice"
import { IoAddCircleOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa"

const Product = () => {
    const { documentId } = useParams()
    const navigate = useNavigate()
    const { colorMode } = useColorMode()
    const [liked, setLiked] = useState(false);

    const {data, isLoading} = useAuthenticatedQuery({
        action: "get",
        queryKey: [`product${documentId}`],
        url: `api/products/${documentId}?populate[0]=thumbnail&populate[1]=category&fields[0]=title&fields[1]=documentId&fields[2]=id&fields[3]=description&fields[4]=price&fields[5]=rating&fields[6]=discount&fields[7]=stock`,
    })
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(data?.data?.title) {
            document.title = `Prodcut ${data.data.title} Page`
        }
    }, [data])
    const goBack = () => navigate(-1)
    if(isLoading) return <ProductDetailsSkeleton />

    if(!data.data) return null
    const product : IProduct = data?.data
    const {title, description, price, thumbnail:{url}, category, rating, discount, stock}= product

    const addCart = () => {
        dispatch(addCartItmesAction(data.data))
    }
return (
    <Box  mt={10}>
        <Flex
        alignItems={"center"}
        mx="auto"
        maxW={"sm"}
        fontSize={"lg"}
        cursor={"pointer"}
        onClick={goBack}
        mb={5}
        >
            <BsArrowLeft />
            <Text ml="2">Back</Text>
        </Flex>
            <Box maxW={"sm"} position={"relative"} mx={"auto"} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" px={4} py={3} bg={colorMode === "light" ? "white" : "gray.900"} transition="0.3s" display={"flex"} flexDirection={"column"} justifyContent={"space-between"} height={"100%"} _hover={{     transform: "scale(1.01)",     boxShadow: "lg", }}>
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
        {discount ? <>
            <Box bg={"red.500"} color={"white"} borderRadius={"md"} position={"absolute"} top={"10px"} left={"-3px"} py={"3px"} px={"10px"}>
                %{discount}
            </Box>
        </> : null}
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
            </Flex>
            <VStack align="start" mt={6} p={3}>
                <Heading
                    size="md"
                    color={colorMode === "light" ? "teal.600" : "teal.300"}
                >
                    {title}
                </Heading>

                <Text
                    color={colorMode === "light" ? "gray.600" : "gray.300"}
                    fontSize="sm"
                >
                    {description}
                </Text>
                <Flex>
                    <Text fontSize="md" color={colorMode === "light" ? "teal.600" : "teal.300"}>category: </Text>
                    <Text ml={2} fontSize="sm" color={colorMode === "light" ? "gray.600" : "gray.300"}>{category.title}</Text>
                </Flex>

                <Text
                    fontWeight="bold"
                    color={colorMode === "light" ? "teal.500" : "teal.200"}
                    fontSize="lg"
                >
                    { `$${price.toLocaleString("en-us")}` }
                </Text>
                <Flex mt="1">
                    <RatingGroup.Root colorPalette="teal" readOnly count={5} defaultValue={rating} size="md">
                        <RatingGroup.HiddenInput />
                        <RatingGroup.Control />
                    </RatingGroup.Root>
                    <Text ml={"3px"}>{rating}</Text>
                    <Text ml={"3px"} color={colorMode === "light" ? "teal.600" : "teal.300"}>{`(${stock})`}</Text>
                </Flex>

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
    </Box>
)
}

export default Product