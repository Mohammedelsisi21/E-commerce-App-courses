import {VStack,Skeleton,SkeletonText, Box, Flex, Text} from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ProductDetailsSkeleton = () => {
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }

    return (<>
        <Flex
        mt={10}
        alignItems={"center"}
        mx="auto"
        maxW={"sm"}
        fontSize={"lg"}
        cursor={"pointer"}
        onClick={goBack}
        mb={2}
        >
            <BsArrowLeft />
            <Text ml="2">Back</Text>
        </Flex>
        <Box
            maxW="sm"
            mx="auto"
            w={"full"}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            px={4}
            py={3}
            transition="0.3s"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
        >
            <Skeleton mx="auto" boxSize="250px" borderRadius="md" />
            <VStack align="start" mt={6} p={3} w="full">
                <Skeleton height="20px" width="70%" />
                <SkeletonText noOfLines={3} width="100%" />
                <Skeleton height="12px" width="40%" />
                <Skeleton height="18px" width="40%" />
                <Skeleton height="40px" width="100%" borderRadius="md" />
            </VStack>
    </Box>
</>)}

export default ProductDetailsSkeleton