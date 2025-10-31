import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bg="gray.50"
      textAlign="center"
      px={4}
    >
      <Heading as="h1" size="4xl" color="indigo.600" mb={2}>
        404
      </Heading>
      <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={2}>
        <Text as="span" color="red.500">
          Oops!
        </Text>{" "}
        Page not found
      </Text>
      <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" mb={8}>
        The page you’re looking for doesn’t exist.
      </Text>
      <Link to={"/"}>
        <Button
          colorScheme="indigo"
          size="lg"
          rounded="md">
          Go Home
        </Button>
        </Link>
    </Flex>
  );
};

export default PageNotFound;
