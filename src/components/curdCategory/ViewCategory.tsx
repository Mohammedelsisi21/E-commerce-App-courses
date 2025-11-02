import type { ICategory } from "@/interfaces"
import CustomeModal from "@/Shared/Modal"
import { useColorMode } from "../ui/color-mode"
import { Box, Flex, Heading, IconButton, Image, Text, VStack, Dialog, Button,} from "@chakra-ui/react"
import { AiFillEye } from "react-icons/ai"
import { useState } from "react"

interface IProps {
    category: ICategory
}

const ViewCategory = ({ category }: IProps) => {
    const { colorMode } = useColorMode()
    const isDark = colorMode === "dark"
    const {title,  thumbnail} = category
    const [isOpen, setOpen] = useState(false)

    return (
        <CustomeModal open={isOpen} onClose={setOpen}
        openModal={
            <IconButton aria-label="View" onClick={() => setOpen(true)} variant="outline" size="sm" color="white" bg="blue.500" _hover={{ transform: "scale(1.1)", bg: "blue.600" }}>
                <AiFillEye />
            </IconButton>
            }
        title="Product Details">
            <VStack align="stretch" p={4} divideColor={isDark ? "gray.700" : "gray.200"}>
                <Flex alignItems={"center"}>
                    <Image src={`${thumbnail[0].url}`} alt={title} boxSize="200px" loading="lazy" objectFit="cover" borderRadius="xl" shadow="xl" transition="all 0.3s ease" _hover={{ transform: "scale(1.05)" }}/>
                  <Box ml={"30px"}>
                    <Heading size="lg" mb={1} color={isDark ? "teal.200" : "teal.700"} textAlign="center">
                        {title}
                    </Heading>
                    <Text fontSize="sm" textAlign="center" color={isDark ? "gray.400" : "gray.600"}>
                        ID: {category.id ?? "N/A"}
                    </Text>
                  </Box>
                </Flex>
                <Dialog.Footer display="flex" justifyContent="flex-end" gap="3">
                    <Dialog.ActionTrigger asChild>
                        <Button onClick={()=> setOpen(false)} variant={"outline"} type={"button"} textTransform="capitalize" fontSize="md" fontWeight="semibold" colorScheme="blue" color={"blue.500"} _hover={{ transform: "scale(1.02)", boxShadow: "md" }} _active={{transform: "scale(0.98)"}}>
                            OK
                        </Button>
                    </Dialog.ActionTrigger>
            </Dialog.Footer>
            </VStack>
        </CustomeModal>
    )
}

export default ViewCategory
