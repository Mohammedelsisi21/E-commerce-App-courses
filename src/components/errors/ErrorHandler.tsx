import { Link, useLocation } from "react-router-dom";
import { Button, Flex, Heading, Text, VStack, Icon } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import { IoCloseCircleOutline } from "react-icons/io5";
// import { CloseIcon } from "@chakra-ui/icons";

interface IProps {
  statusCode?: number;
  title?: string;
}

const ErrorHandler = ({ statusCode = 500, title = "Server Error" }: IProps) => {
  const { pathname } = useLocation();
  const bg = useColorModeValue("red.100", "red.900");
  const iconBg = useColorModeValue("red.200", "red.700");
  const textColor = useColorModeValue("gray.700", "gray.200");

  return (
    <Flex
      position="fixed"
      inset="0"
      align="center"
      justify="center"
      p={5}
      w="full"
    >
      <VStack p={6} textAlign="center">
        <Flex
          align="center"
          justify="center"
          bg={bg}
          p={4}
          rounded="full"
        >
          <Flex
            align="center"
            justify="center"
            bg={iconBg}
            p={4}
            rounded="full"
          >
            <Icon as={IoCloseCircleOutline} w={10} h={10} color="red.600" />
          </Flex>
        </Flex>

        <Heading fontSize={{ base: "3xl", lg: "5xl" }} fontWeight="bold">
          {statusCode} - {title}
        </Heading>

        <Text color={textColor} fontSize={{ base: "md", lg: "lg" }}>
          Oops, something went wrong. Try refreshing this page or <br />
          feel free to contact us if the problem persists.
        </Text>

        <Flex gap={4} mt={5}>
          <Link to={"/"}>
            <Button colorScheme="blue">
              Home
            </Button>
          </Link>
          <Link to={pathname}>
            <Button colorScheme="blue">
              Refresh
            </Button>
          </Link>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default ErrorHandler;
