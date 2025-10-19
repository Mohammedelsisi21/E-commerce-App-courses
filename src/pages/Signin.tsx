import { useColorMode } from "@/components/ui/color-mode"
import { PasswordInput } from "@/components/ui/password-input"
import { Divider } from "@chakra-ui/layout"
import {
  Box,
  Button,
  Flex,
  Field,
  Fieldset,
  Input,
  Link,
  Stack,
  Text,
  IconButton,
} from "@chakra-ui/react"
import { FaGoogle, FaGithub } from "react-icons/fa"

const Signin = () => {
    const { colorMode } = useColorMode()
    const isDark = colorMode === "dark"

return (
    <Box bg={isDark ? "gray.900" : "teal.50"} color={isDark ? "teal.100" : "gray.700"} p={8} borderRadius="lg" maxW="sm" mx="auto" mt={12} boxShadow="2xl">
        <Fieldset.Root size="lg" maxW="md">
            <Stack p={5}>
                <Fieldset.Legend textAlign="center" color={isDark ? "teal.300" : "teal.700"} fontSize="3xl" fontWeight="700">
                    Login
                </Fieldset.Legend>

                <Fieldset.HelperText textAlign="center" color={isDark ? "gray.400" : "gray.500"}>
                    Please enter your credentials to sign in.
                </Fieldset.HelperText>
            </Stack>

        <Fieldset.Content mt={6}>
            <Field.Root>
                <Field.Label color={isDark ? "teal.200" : "teal.700"}>
                    Username
                </Field.Label>
                <Input name="username" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
            </Field.Root>

            <Field.Root mt={4}>
                <Field.Label color={isDark ? "teal.200" : "teal.700"}>
                    Password
                </Field.Label>
                <PasswordInput  type="password" name="password" bg={isDark ? "gray.800" : "white"} borderColor={isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }} color={isDark ? "teal.100" : "gray.700"}/>
                <Flex justify="flex-end" mt={2}>
                    <Link color={isDark ? "teal.400" : "teal.600"} fontSize="sm" _hover={{ color: isDark ? "teal.300" : "teal.800" }}>
                        Forgot Password?
                    </Link>
                </Flex>
            </Field.Root>
            <Button mt={4} bg={isDark ? "teal.500" : "teal.600"} color="white" fontWeight="600" w="full" _hover={{ bg: isDark ? "teal.400" : "teal.700" }} transition="0.3s">
                Sign in
            </Button>
        </Fieldset.Content>

        <Flex align="center" py={5}>
            <Divider flex="1" borderColor={isDark ? "gray.700" : "gray.300"} />
                <Text px={3} color={isDark ? "gray.400" : "gray.600"} fontSize="sm">
                    Login with social accounts
                </Text>
            <Divider flex="1" borderColor={isDark ? "gray.700" : "gray.300"} />
        </Flex>

        <Flex justify="center" mb={4}>
            <IconButton aria-label="Log in with Google" bg="transparent" color={isDark ? "teal.200" : "teal.700"} _hover={{ color: "teal.400" }} mx={1}>
                <FaGoogle />
            </IconButton>
            <IconButton aria-label="Log in with GitHub" bg="transparent" color={isDark ? "teal.200" : "teal.700"} _hover={{ color: "teal.400" }} mx={1}>
                <FaGithub />
            </IconButton>
        </Flex>

        <Text textAlign="center" fontSize="sm" color={isDark ? "gray.400" : "gray.600"}>
            Don't have an account?{" "}
            <Link color={isDark ? "teal.300" : "teal.700"} _hover={{ textDecoration: "underline", color: "teal.400" }}>
                Sign up
            </Link>
        </Text>
        </Fieldset.Root>
    </Box>)
}

export default Signin
