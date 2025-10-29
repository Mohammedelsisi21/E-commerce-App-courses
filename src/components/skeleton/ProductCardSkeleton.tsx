import { Box, Skeleton, SkeletonText, VStack, Flex } from "@chakra-ui/react";


const ProductCardSkeleton = () => {
  return (
    <Box
      maxW="sm"
      mx="auto"
      w="full"
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
      position="relative"
    >
      <Skeleton
        mx="auto"
        boxSize="200px"
        borderRadius="md"
      />

      <VStack align="start" mt={6} p={3} w="full">
        <Skeleton height="20px" width="70%"/>

        <SkeletonText noOfLines={3} p="3" width="100%"/>

        <Flex justifyContent="space-between" alignItems="center" w="full" mt={2}>
          <Skeleton height="18px" width="40%"/>
          <Skeleton height="30px" width="30px" borderRadius="full"/>
        </Flex>
      </VStack>

      <Flex flexDirection="column" gap={3} position="absolute" right="10px" top="20px">
        <Skeleton height="30px" width="30px" borderRadius="full"/>
        <Skeleton height="30px" width="30px" borderRadius="full"/>
      </Flex>
    </Box>
  );
};

export default ProductCardSkeleton;
