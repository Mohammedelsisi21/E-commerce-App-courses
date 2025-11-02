import { useNavigate, useParams } from "react-router-dom"
import useAuthenticatedQuery from "../hooks"
import { Box, Button, Flex, Heading, Image, RatingGroup, Text, VStack } from "@chakra-ui/react"
import { useColorMode } from "@/components/ui/color-mode"
import type { IProduct } from "@/interfaces"
import { useEffect, useState } from "react"
import { BsArrowLeft } from "react-icons/bs"
import ProductDetailsSkeleton from "@/components/skeleton/ProductDetailsSkeleton"
import { useAppDispatch } from "@/app/store"
import { addCartItmesAction } from "@/app/features/cart/cartSlice"
import { IoAddCircleOutline } from "react-icons/io5"
import { FaHeart } from "react-icons/fa"
import SliderCategory from "@/components/slider/SliderCategory"

const Product = () => {
    const { documentId } = useParams()
    const navigate = useNavigate()
    const { colorMode } = useColorMode()
    const [liked, setLiked] = useState(false)
    const dispatch = useAppDispatch()

    const { data, isLoading } = useAuthenticatedQuery({
        action: "get",
        queryKey: [`product${documentId}`],
        url: `api/products/${documentId}?populate[0]=thumbnail&populate[1]=category&fields[0]=title&fields[1]=documentId&fields[2]=id&fields[3]=description&fields[4]=price&fields[5]=rating&fields[6]=discount&fields[7]=stock`,
    })

    useEffect(() => {
        if (data?.data?.title) {
            document.title = `Product ${data.data.title} Page`
        }
    }, [data])

    const goBack = () => navigate(-1)

    const addCart = () => {
        if (data?.data) {
            dispatch(addCartItmesAction(data.data))
        }
    }

    if (isLoading) return <ProductDetailsSkeleton />
    if (!data?.data) return null

    const product: IProduct = data.data
    const { title, description, price, thumbnail, category, rating, discount, stock } = product
    const thumbnailUrl = thumbnail?.url || ""

    return (
        <>
            <Box mt={10} px={{ base: 4, md: 6 }}>
                <Flex
                    alignItems="center"
                    mx="auto"
                    maxW="4xl"
                    fontSize="lg"
                    cursor="pointer"
                    onClick={goBack}
                    mb={5}
                    _hover={{ color: "teal.500" }}
                    transition="0.2s"
                >
                    <BsArrowLeft />
                    <Text ml={2}>Back</Text>
                </Flex>

                <Box
                    maxW="4xl"
                    minH="sm"
                    position="relative"
                    mx="auto"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="md"
                    p={{ base: 4, md: 6 }}
                    bg={colorMode === "light" ? "white" : "gray.900"}
                    transition="all 0.3s"
                    _hover={{
                        transform: "scale(1.01)",
                        boxShadow: "lg",
                    }}
                >
                    { discount && discount > 0 ?  (
                        <Box
                            bg="red.500"
                            color="white"
                            borderRadius="md"
                            position="absolute"
                            top="10px"
                            left="10px"
                            py={1}
                            px={3}
                            fontWeight="bold"
                            fontSize="sm"
                            zIndex={2}
                        >
                            %{discount}
                        </Box>
                    ): null}

                    <Flex
                        position="absolute"
                        right="10px"
                        top="10px"
                        zIndex={2}
                    >
                        <Button
                            variant="ghost"
                            p={2}
                            borderRadius="full"
                            onClick={() => setLiked(!liked)}
                            _hover={{
                                bg: colorMode === "light" ? "gray.100" : "gray.700",
                            }}
                        >
                            <FaHeart
                                style={{
                                    color: liked ? "#EF4444" : "#9e9e9e",
                                    transition: "0.3s",
                                    fontSize: "24px",
                                }}
                            />
                        </Button>
                    </Flex>

                    <Flex
                        direction={{ base: "column", md: "row" }}
                        alignItems={{ base: "center", md: "flex-start" }}
                        gap={6}
                    >
                        <Box flexShrink={0}>
                            <Image
                                src={thumbnailUrl}
                                alt={title}
                                boxSize={{ base: "200px", md: "250px" }}
                                objectFit="cover"
                                borderRadius="md"
                                border="1px solid"
                                borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
                                shadow="md"
                            />
                        </Box>

                        <VStack align="start" flex={1} p={4} w="full">
                            <Heading
                                size={{ base: "lg", md: "xl" }}
                                color={colorMode === "light" ? "teal.600" : "teal.300"}
                            >
                                {title}
                            </Heading>

                            <Text
                                color={colorMode === "light" ? "gray.600" : "gray.300"}
                                fontSize="sm"
                                lineHeight="tall"
                            >
                                {description}
                            </Text>

                            <Flex alignItems="center">
                                <Text
                                    fontSize="md"
                                    fontWeight="semibold"
                                    color={colorMode === "light" ? "teal.600" : "teal.300"}
                                >
                                    Category:
                                </Text>
                                <Text
                                    ml={2}
                                    fontSize="sm"
                                    color={colorMode === "light" ? "gray.600" : "gray.300"}
                                >
                                    {category?.title || "N/A"}
                                </Text>
                            </Flex>

                            <Flex alignItems="center" gap={2}>
                                <RatingGroup.Root colorPalette="yellow" readOnly count={5} defaultValue={rating} size="md">
                                    <RatingGroup.HiddenInput />
                                    <RatingGroup.Control />
                                </RatingGroup.Root>
                                <Text fontWeight="semibold">{rating}</Text>
                                <Text
                                    color={colorMode === "light" ? "teal.600" : "teal.300"}
                                    fontSize="sm"
                                >
                                    ({stock} in stock)
                                </Text>
                            </Flex>

                            <Flex
                                justifyContent="space-between"
                                w="full"
                                alignItems="center"
                                mt={4}
                            >
                                {discount && discount > 0 ? (
                                    <Flex alignItems="center" gap={2}>
                                        <Text
                                            fontWeight="bold"
                                            fontSize="2xl"
                                            color={colorMode === "light" ? "teal.600" : "teal.300"}
                                        >
                                            ${(price * (1 - discount / 100)).toFixed(2)}
                                        </Text>
                                        <Text
                                            textDecoration="line-through"
                                            color={colorMode === "light" ? "gray.500" : "gray.400"}
                                            fontSize="lg"
                                        >
                                            ${price.toFixed(2)}
                                        </Text>
                                    </Flex>
                                ) : (
                                    <Text
                                        fontWeight="bold"
                                        color={colorMode === "light" ? "teal.600" : "teal.300"}
                                        fontSize="2xl"
                                    >
                                        ${price.toFixed(2)}
                                    </Text>
                                )}

                                <Button
                                    colorScheme="teal"
                                    size="lg"
                                    borderRadius="full"
                                    onClick={addCart}
                                    _hover={{
                                        transform: "scale(1.05)",
                                    }}
                                    transition="0.2s"
                                ><IoAddCircleOutline size={24} />
                                    Add to Cart
                                </Button>
                            </Flex>
                        </VStack>
                    </Flex>
                </Box>
            </Box>

            {/* منتجات من نفس الفئة */}
            <SliderCategory />
        </>
    )
}

export default Product