import Footer from "@/Layout/Footer"
import Navbar from "@/Layout/Navbar"
import { Box, Container, Flex, Stack } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <Box>
    <Container>
      <Navbar />
      <Flex flexDirection={"column"}>
        <Stack flexGrow={"1"} pt={"100px"} minH={"100vh"}>
          <Outlet />
        </Stack>
      </Flex>
    </Container>
        <Footer />
    </Box>
  )
}

export default Layout