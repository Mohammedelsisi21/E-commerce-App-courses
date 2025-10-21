import { useColorMode } from "@/components/ui/color-mode"
import { PasswordInput } from "@/components/ui/password-input"
import type { ILoginForm } from "../interfaces"
import { Box, Button, Field, Fieldset, Flex, Input, Stack, Text,} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useForm, type SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "../validation"
import { useDispatch } from "react-redux"
import { userLogin } from "../app/features/login/loginSlice"
import { useAppSelector, type AppDispatch, type RootState } from "../app/store"
import { useEffect } from "react"

const Signin = () => {
    const { colorMode } = useColorMode()
    const isDark = colorMode === "dark"
    const {isLoading, error, data} = useAppSelector((store: RootState) =>store.login )
    const dispatch = useDispatch<AppDispatch>()
    const { register, handleSubmit, formState: { errors }} = useForm<ILoginForm>(
        {
    resolver: yupResolver(loginSchema),
  }
)
    useEffect(() => {
        if(data) {
            setTimeout(()=> {
                location.replace("/")
            },1500)
        }
    })
    const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    dispatch(userLogin(data))
    }

return (
    <Box as={"form"} onSubmit={handleSubmit(onSubmit)} bg={isDark ? "gray.900" : "teal.50"} color={isDark ? "teal.100" : "gray.700"} p={8} borderRadius="lg" maxW="sm" mx="auto" mt={12} boxShadow="2xl">
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
            <Field.Root>
                <Field.Label color={errors.identifier?.message ? "#f87171" : isDark ? "teal.200" : "teal.700"}>
                    Email Address <Field.RequiredIndicator />
                </Field.Label>
                <Input {...register("identifier", { required: true })} name="identifier" bg={isDark ? "gray.800" : "white"} borderColor={errors.identifier?.message ? "#f87171" : isDark ? "gray.700" : "teal.300"} _focus={{ borderColor: `${errors.identifier?.message ? "#f87171" : "teal.400"}`, boxShadow: "0 0 0 1px teal.400" }} color={errors.identifier?.message ? "#f87171" : isDark ? "teal.100" : "gray.700"}/>
                {errors.identifier?.message && <p style={{color: "#f87171", fontSize: 12}}>{errors.identifier.message}</p>}
            </Field.Root>

            <Field.Root>
                <Field.Label color={errors.password?.message ? "#f87171" : isDark ? "teal.200" : "teal.700"}>
                    Password <Field.RequiredIndicator />
                </Field.Label>
                <PasswordInput {...register("password", { required: true })} type="password" name="password" bg={isDark ? "gray.800" : "white"} borderColor={errors.password ? "#f87171" : isDark ? "gray.700" : "teal.300"} _focus={{ borderColor:`${errors.password?.message ? "#f87171" : "teal.400"}`, boxShadow: "0 0 0 1px teal.400" }} color={errors.password?.message ? "#f87171" : isDark ? "teal.100" : "gray.700"}/>
                {errors.password?.message && <p style={{color: "#f87171", fontSize: 12}}>{errors.password?.message}</p>}
            </Field.Root>
            <Button loading={isLoading} type="submit" mt={4} bg={error||errors.identifier?.message || errors.password?.message ? "red.500" : isDark ? "teal.500" : "teal.600"} color="white" fontWeight="600" w="full" _hover={{ bg: errors.identifier?.message || errors.password?.message ? "red.400" : isDark ? "teal.400" : "teal.700" }} transition="0.3s">
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
