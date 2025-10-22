import { useAppSelector } from "@/app/store"
import { Box ,Flex, Image, Text, VStack } from "@chakra-ui/react"


const CartDrawerProduct = () => {
    const {cartItems} = useAppSelector((store) => store.cart)
    console.log(cartItems)
    const totalPrice: number = cartItems.reduce((acc , itme) => acc + itme.price, 0)
    
    return (<>
            {cartItems.length > 0 ? <>
                {cartItems.map((item) => (
                    <Box key={item.id} p={3} borderBottom="1px solid" borderColor="gray.200">
                        <Flex justifyContent={"space-evenly"} alignItems={""}>
                            <Image src={`${import.meta.env.VITE_LOCAL_API}${item.thumbnail.url}`} alt={item.title} boxSize="80px" borderRadius="md" />
                            <VStack mt={2}>
                            <Text fontWeight="medium">{item.title}</Text>
                            <Text color="teal.500">${item.price}</Text>
                            </VStack>
                        </Flex>
                    </Box>
                ))}
                <Flex justifyContent="space-between" alignItems="center" mt={4} p={3} bg="teal.50" borderRadius="md" boxShadow="sm">
                    <Text fontSize="lg" fontWeight="semibold" color="gray.700">
                        Total:
                    </Text>
                    <Text fontSize="xl" fontWeight="bold" color="teal.600">
                        ${totalPrice.toFixed(2)}
                    </Text>
                </Flex>

            </>:
            (
                <Box textAlign="center" py={8}>
                    <Text fontSize="lg" fontWeight="semibold" mb={4}>
                        Your cart is empty
                    </Text>
                    <Text color="gray.500" mb={6}>
                        Go to the products page and add some items.
                    </Text>
                </Box>
            )}
</>)
}

export default CartDrawerProduct