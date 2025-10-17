import { Box, Image, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorMode } from "./ui/color-mode";

const ProductCard = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
    maxW={"sm"}
    mx={"auto"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      px={4}
      py={3}
      bg={colorMode === "light" ? "white" : "gray.900"}
      transition="0.3s"
      _hover={{
        transform: "scale(1.01)",
        boxShadow: "lg",
      }}
    >
      <Image
        src="data:image/jpeg;base64,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"
        alt="Product Image"
        mx="auto"
        boxSize="200px"
        objectFit="cover"
        borderRadius="md"
      />

      <VStack align="center" mt={6} p={3}>
        <Heading
          size="md"
          textAlign="center"
          color={colorMode === "light" ? "teal.600" : "teal.300"}
        >
          Product Title
        </Heading>

        <Text
          color={colorMode === "light" ? "gray.600" : "gray.300"}
          fontSize="sm"
          textAlign="center"
        >
          This is a short product description to show details.
        </Text>

        <Text
          fontWeight="bold"
          color={colorMode === "light" ? "teal.500" : "teal.200"}
          fontSize="lg"
        >
          $49.99
        </Text>

        <Link to={"/product/1"}>
          <Button
            bg={colorMode === "light" ? "teal.500" : "teal.400"}
            color="white"
            size="md"
            w="full"
            borderRadius="md"
            _hover={{
              bg: colorMode === "light" ? "teal.600" : "teal.300",
            }}
          >
            View Details
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default ProductCard;
