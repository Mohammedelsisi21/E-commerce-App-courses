import Navbar from "@/Layout/Navbar"
import { Container, Flex, Stack } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <Container>
      <Flex flexDirection={"column"}>
        <Navbar />
        <Stack flexGrow={"1"} pt={"100px"}>
          <Outlet />
        </Stack>
      </Flex>
    </Container>
  )
}

export default Layout