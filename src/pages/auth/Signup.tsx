import { useColorMode } from "@/components/ui/color-mode"
import { PasswordInput } from "@/components/ui/password-input"
import type { IRegisterForm } from "@/interfaces"
import { Box, Button, Field, Fieldset, Flex, Input, Stack, Text,} from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { useForm, type SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from "@/validation"
import { useAppDispatch, useAppSelector } from "@/app/store"
import { userRegister } from "@/app/features/register/registerSlice"
import { useEffect } from "react"
import CircleUi from "@/components/myUi/CircleUi"

const Signup = () => {
    const {colorMode} = useColorMode()
    const isDark = colorMode === "dark"
    const {register, handleSubmit, formState: {errors}} = useForm<IRegisterForm>({
        resolver: yupResolver(registerSchema)
    })
    const navigate = useNavigate()
    
    const {userData ,error, isLoading}=useAppSelector((store) => store.register)
    useEffect(() => {
    if(userData) {
        navigate("/signin")
    }
    },[userData])

    const dispatch = useAppDispatch()
    const onSubmit : SubmitHandler<IRegisterForm> = (data) => {
    dispatch(userRegister(data))
    }

return (<Box position="relative" h="100vh" overflow="hidden" bg={isDark ? "gray.900" : "teal.50"}>
    <CircleUi />
    <Flex h={"100vh"} alignItems={"center"} justifyContent={"center"} zIndex={1} position="relative" >
    <Box as={"form"} onSubmit={handleSubmit(onSubmit)} color={isDark ? "teal.100" : "gray.700"} p={8} borderRadius="lg" maxW="sm" mx="auto" mt={12} boxShadow="2xl">
        <Fieldset.Root size="lg" maxW="md">
            <Stack p={5}>
                <Fieldset.Legend textAlign="center" color={isDark ? "teal.300" : "teal.700"} fontSize="3xl" fontWeight="700">
                    Register
                </Fieldset.Legend>

                <Fieldset.HelperText textAlign="center" color={isDark ? "gray.400" : "gray.500"}>
                    Please enter your credentials to sign up.
                </Fieldset.HelperText>
            </Stack>

        <Fieldset.Content>
            <Field.Root>
                <Field.Label color={errors.email?.message ? "#f87171" : isDark ? "teal.200" : "teal.700"}>
                    Email Address <Field.RequiredIndicator />
                </Field.Label>
                <Input {...register("email", { required: true })} name="email" bg={isDark ? "gray.800" : "white"} borderColor={errors.email?.message ? "#f87171" : isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: `${errors.email?.message ? "#f87171" : "teal.400"}`, boxShadow: "0 0 0 1px teal.400" }} color={errors.email?.message ? "#f87171" : isDark ? "teal.100" : "gray.700"}/>
                {errors.email?.message && <p style={{color: "#f87171", fontSize: 12}}>{errors.email.message}</p>}
            </Field.Root>

            <Field.Root>
                <Field.Label color={errors.username?.message ? "#f87171" : isDark ? "teal.200" : "teal.700"}>
                    userName <Field.RequiredIndicator />
                </Field.Label>
                <Input {...register("username", { required: true })} name="username" bg={isDark ? "gray.800" : "white"} borderColor={errors.username?.message ? "#f87171" : isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: `${errors.username?.message ? "#f87171" : "teal.400"}`, boxShadow: "0 0 0 1px teal.400" }} color={errors.username?.message ? "#f87171" : isDark ? "teal.100" : "gray.700"}/>
                {errors.username?.message && <p style={{color: "#f87171", fontSize: 12}}>{errors.username.message}</p>}
            </Field.Root>

            <Field.Root>
                <Field.Label color={errors.password?.message ? "#f87171" : isDark ? "teal.200" : "teal.700"}>
                    Password <Field.RequiredIndicator />
                </Field.Label>
                <PasswordInput {...register("password", { required: true })} type="password" name="password" bg={isDark ? "gray.800" : "white"} borderColor={errors.password ? "#f87171" : isDark ? "gray.700" : "teal.300"} _focus={{ borderColor:`${errors.password?.message ? "#f87171" : "teal.400"}`, boxShadow: "0 0 0 1px teal.400" }} color={errors.password?.message ? "#f87171" : isDark ? "teal.100" : "gray.700"}/>
                {errors.password?.message && <p style={{color: "#f87171", fontSize: 12}}>{errors.password?.message}</p>}
            </Field.Root>
            <Button loading={isLoading} type="submit" mt={4} bg={error || errors.email?.message || errors.password?.message ? "red.500" : isDark ? "teal.500" : "teal.600"} color="white" fontWeight="600" w="full" _hover={{ bg: error || errors.email?.message || errors.password?.message ? "red.400" : isDark ? "teal.400" : "teal.700" }} transition="0.3s">
                Sign up
            </Button>
        </Fieldset.Content>
        <Flex justifyContent="center" fontSize="sm" color={isDark ? "gray.400" : "gray.600"}>
            have an account?{" "}
            <Link to={"/signin"}>
                <Text color={isDark ? "teal.300" : "teal.700"} _hover={{ textDecoration: "underline", color: "teal.400" }}>
                    Sign in
                </Text>
            </Link>
        </Flex>
        </Fieldset.Root>
    </Box>
</Flex>
  </Box>)
}

export default Signup