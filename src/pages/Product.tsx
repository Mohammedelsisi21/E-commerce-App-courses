import { Link, useNavigate, useParams } from "react-router-dom"
import useAuthenticatedQuery from "../hooks"
import { Box, Button, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react"
import { useColorMode } from "@/components/ui/color-mode"
import type { IProduct } from "@/interfaces"
import { useEffect } from "react"
import { BsArrowLeft } from "react-icons/bs"
import ProductDetailsSkeleton from "@/components/ProductDetailsSkeleton"
import { useAppDispatch } from "@/app/store"
import { addCartItmesAction } from "@/app/features/cart/cartSlice"





const Product = () => {
    const { documentId } = useParams()
    const navigate = useNavigate()
    const { colorMode } = useColorMode()

    const {data, isLoading} = useAuthenticatedQuery({
        action: "get",
        queryKey: [`product${documentId}`],
        url: `api/products/${documentId}?populate[0]=thumbnail&populate[1]=category&fields[0]=title&fields[1]=documentId&fields[2]=id&fields[3]=description&fields[4]=price`,
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
    const {title, description, price, thumbnail:{url}, category}= product

    const addCart = () => {
        dispatch(addCartItmesAction(data.data))
    }
return (
    <Box mt={10}>
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
            <Box maxW={"sm"} mx={"auto"} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" px={4} py={3} bg={colorMode === "light" ? "white" : "gray.900"} transition="0.3s" display={"flex"} flexDirection={"column"} justifyContent={"space-between"} height={"100%"} _hover={{     transform: "scale(1.01)",     boxShadow: "lg", }}>
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

                <Link to={``} style={{ width: "100%" }}>
                    <Button
                    textTransform={"uppercase"}
                    alignContent={"center"}
                    bg={colorMode === "light" ? "teal.500" : "teal.400"}
                    color="white"
                    size="md"
                    w="full"
                    borderRadius="md"
                    _hover={{
                        bg: colorMode === "light" ? "teal.600" : "teal.300",
                    }}
                    onClick={addCart}
                    >
                        Add to cart
                    </Button>
                </Link>
            </VStack>
        </Box>
    </Box>
)
}

export default Product