import {
  Box,
  VStack,
  Skeleton,
  SkeletonText,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useColorMode } from "@/components/ui/color-mode";

const ProductDetailsSkeleton = () => {
    const navigate = useNavigate();
    const { colorMode } = useColorMode();
    const bgColor = colorMode === "light" ? "gray.200" : "gray.700";
    const boxBg = colorMode === "light" ? "white" : "gray.900";

    const goBack = () => navigate(-1);

    return (
    <Box mt={10}>
        <Flex
        alignItems="center"
        mx="auto"
        maxW="sm"
        fontSize="lg"
        cursor="pointer"
        onClick={goBack}
        mb={5}
        color={colorMode === "light" ? "gray.700" : "gray.300"}>
            <BsArrowLeft />
            <Text ml="2">Back</Text>
        </Flex>

        <Box
        maxW="sm"
        position="relative"
        mx="auto"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        px={4}
        py={3}
        bg={boxBg}
        transition="0.3s"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%" >
            <Skeleton
            mx="auto"
            boxSize="200px"
            borderRadius="md"
            bg={bgColor}/>

            <Skeleton
            position="absolute"
            top="10px"
            left="-3px"
            height="25px"
            width="60px"
            borderRadius="md"
            bg={bgColor}/>

        <Flex flexDirection="column" gap={3} position="absolute" right="10px" top="20px">
            <Skeleton height="30px" width="30px" borderRadius="full" bg={bgColor} />
        </Flex>

        <VStack align="start" mt={6} p={3} w="full">
            <Skeleton height="20px" width="70%" bg={bgColor} />

            <SkeletonText noOfLines={3} p="3" h="3" bg={bgColor} />

            <Skeleton height="16px" width="40%" bg={bgColor} />

            <Flex alignItems="center" gap={3} w="full">
                <Skeleton height="20px" width="80px" bg={bgColor} />
                <Skeleton height="20px" width="30px" bg={bgColor} />
            </Flex>

            <Flex justifyContent="space-between" w="full" alignItems="center" mt={3}>
                <Skeleton height="24px" width="100px" bg={bgColor} />
                <Button
                disabled
                borderRadius="full"
                p={0}
                bg={bgColor}
                height="40px"
                width="40px"/>
            </Flex>
        </VStack>
    </Box>
</Box>
)};

export default ProductDetailsSkeleton;
