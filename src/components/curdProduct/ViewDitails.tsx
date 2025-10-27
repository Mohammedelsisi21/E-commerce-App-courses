import type { IProduct } from "@/interfaces"
import CustomeModal from "@/Shared/Modal"
import { useColorMode } from "../ui/color-mode"
import { Box, Flex, Heading, HStack, IconButton, Image, Text, Badge, VStack, Dialog, Button,} from "@chakra-ui/react"
import { AiFillEye } from "react-icons/ai"

interface IProps {
    product: IProduct
}

const ViewDetails = ({ product }: IProps) => {
    const { colorMode } = useColorMode()
    const isDark = colorMode === "dark"
    const { id, category, description, title, price, stock, thumbnail: { url }} = product

    return (
        <CustomeModal
        openModal={
            <IconButton aria-label="View" variant="outline" size="sm" color="white" bg="blue.500" _hover={{ transform: "scale(1.1)", bg: "blue.600" }}>
                <AiFillEye />
            </IconButton>
            }
        title="Product Details">
            <VStack align="stretch" p={4} divideColor={isDark ? "gray.700" : "gray.200"}>
                <Flex justify="center">
                    <Image src={`${import.meta.env.VITE_LOCAL_API}${url}`} alt={title} boxSize="200px" objectFit="cover" borderRadius="xl" shadow="xl" transition="all 0.3s ease" _hover={{ transform: "scale(1.05)" }}/>
                </Flex>

                <Box>
                    <Heading size="md" mb={1} color={isDark ? "teal.200" : "teal.700"} textAlign="center">
                        {title}
                    </Heading>
                    <Text fontSize="sm" textAlign="center" color={isDark ? "gray.400" : "gray.600"}>
                        ID: {id ?? "N/A"}
                    </Text>
                </Box>

                <HStack justify="space-between">
                    <HStack>
                        <Text fontWeight="semibold" color={isDark ? "gray.200" : "gray.700"}>
                            Category:
                        </Text>

                        <Badge colorScheme="purple" px={3} py={1} borderRadius="md">
                            {category?.title || "Unknown"}
                        </Badge>
                    </HStack>

                    <Text fontSize="lg" fontWeight="bold" color={isDark ? "yellow.300" : "yellow.600"}>
                        ${price}
                    </Text>
                </HStack>

                {stock !== undefined && (
                <Text textAlign="center" fontWeight="semibold" color={stock > 0 ? "green.400" : "red.400"}>
                    {stock > 0 ? `In Stock: ${stock}` : "Out of Stock"}
                </Text>
            )}

                <Box>
                    <Heading size="sm" mb={2} color={isDark ? "blue.200" : "blue.700"}>
                        Description
                    </Heading>
                    <Text fontSize="sm" lineHeight="1.6" color={isDark ? "gray.300" : "gray.600"}>
                        {description || "No description available."}
                    </Text>
                </Box>
                <Dialog.Footer display="flex" justifyContent="flex-end" gap="3">
                    <Dialog.ActionTrigger asChild>
                        <Button variant={"outline"} type={"button"} textTransform="capitalize" fontSize="md" fontWeight="semibold" colorScheme="blue" color={"blue.500"} _hover={{ transform: "scale(1.02)", boxShadow: "md" }} _active={{transform: "scale(0.98)"}}>
                            OK
                        </Button>
                    </Dialog.ActionTrigger>
            </Dialog.Footer>
            </VStack>
        </CustomeModal>
    )
}

export default ViewDetails
