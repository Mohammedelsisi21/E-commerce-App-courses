import { useColorMode } from "@/components/ui/color-mode"
import { PasswordInput } from "@/components/ui/password-input"
import type { ILoginForm } from "../interfaces"
import { Box, Button, Field, Fieldset, Flex, Input, Stack, Text,} from "@chakra-ui/react"
import { useState, type ChangeEvent, type FormEvent } from "react"
import { Link } from "react-router-dom"

const Signin = () => {
    const { colorMode } = useColorMode()
    const isDark = colorMode === "dark"
    const [user, setUser] = useState<ILoginForm>({
        identifier: "",
        password: ""
    })

    const [isIdentifier, setIsIdentifier] = useState<boolean>(true)
    const [isPassword, setIsPassword] = useState<boolean>(true)
    
    // ** Heandlers
    const onChange = (e : ChangeEvent<HTMLInputElement>)=> {
        const {name, value}= e.target
        setUser({...user, [name]: value})
    }

    const onSubmit = (e : FormEvent<HTMLDivElement>) => {
        e.preventDefault()
        console.log(user)

        if(!user.identifier) setIsIdentifier(true)
        else setIsIdentifier(false)
    
        if(!user.password) setIsPassword(true)
        else setIsPassword(false)

    }
return (
    <Box as={"form"} onSubmit={onSubmit} bg={isDark ? "gray.900" : "teal.50"} color={isDark ? "teal.100" : "gray.700"} p={8} borderRadius="lg" maxW="sm" mx="auto" mt={12} boxShadow="2xl">
        <Fieldset.Root size="lg" maxW="md">
            <Stack p={5}>
                <Fieldset.Legend textAlign="center" color={isDark ? "teal.300" : "teal.700"} fontSize="3xl" fontWeight="700">
                    Login
                </Fieldset.Legend>

                <Fieldset.HelperText textAlign="center" color={isDark ? "gray.400" : "gray.500"}>
                    Please enter your credentials to sign in.
                </Fieldset.HelperText>
            </Stack>

        <Fieldset.Content>
            <Field.Root invalid={isIdentifier}>
                <Field.Label color={isDark ? "teal.200" : "teal.700"}>
                    Email Address <Field.RequiredIndicator />
                </Field.Label>
                <Input value={user.identifier} onChange={onChange} name="identifier" bg={isDark ? "gray.800" : "white"} borderColor={isIdentifier ? "#f87171" : isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: `${isIdentifier ? "#f87171" : "teal.400"}`, boxShadow: "0 0 0 1px teal.400" }} color={isIdentifier ? "#f87171" : isDark ? "teal.100" : "gray.700"}/>
                {isIdentifier && <Field.ErrorText>This field is required</Field.ErrorText>}
            </Field.Root>

            <Field.Root invalid={isPassword}>
                <Field.Label color={isDark ? "teal.200" : "teal.700"}>
                    Password <Field.RequiredIndicator />
                </Field.Label>
                <PasswordInput value={user.password} onChange={onChange} type="password" name="password" bg={isDark ? "gray.800" : "white"} borderColor={isPassword ? "#f87171" : isDark ? "gray.700" : "teal.300"} _focus={{ borderColor:`${isPassword ? "#f87171" : "teal.400"}`, boxShadow: "0 0 0 1px teal.400" }} color={isPassword ? "#f87171" : isDark ? "teal.100" : "gray.700"}/>
                {isPassword && <Field.ErrorText>This field is required</Field.ErrorText>}
            </Field.Root>
            <Button type="submit" mt={4} bg={isPassword || isIdentifier ? "red.500" : isDark ? "teal.500" : "teal.600"} color="white" fontWeight="600" w="full" _hover={{ bg: isPassword || isIdentifier ? "red.400" : isDark ? "teal.400" : "teal.700" }} transition="0.3s">
                Sign in
            </Button>
        </Fieldset.Content>
        <Flex justifyContent="center" fontSize="sm" color={isDark ? "gray.400" : "gray.600"}>
            Don't have an account?{" "}
            <Link to={"/signup"}>
                <Text color={isDark ? "teal.300" : "teal.700"} _hover={{ textDecoration: "underline", color: "teal.400" }}>
                    Sign up
                </Text>
            </Link>
        </Flex>
        </Fieldset.Root>
    </Box>)
}

export default Signin
