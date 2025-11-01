import { useGetCategoryListQuery } from "@/app/services/categoryApiSlice"
import { useGetProductListQuery } from "@/app/services/productApiSlice"
import { useGetUserQuery } from "@/app/services/user"
import LineCarrt from "@/components/LineChart"
import { useColorModeValue } from "@/components/ui/color-mode"
import { Box, Grid, Heading, Text, Flex } from "@chakra-ui/react"
import { useEffect } from "react"

const AdminDashboard = () => {

  useEffect(() => {
    document.title = `Dashboard Admin`
  }, [])

  const { data: user } = useGetUserQuery([])
  const { data: cate } = useGetCategoryListQuery({ page: 1, pageSize: 50 })
  const { data: product } = useGetProductListQuery({ page: 1, pageSize: 50 })

  const bgCard = useColorModeValue("white", "gray.800")
  const textColor = useColorModeValue("gray.700", "gray.200")
  const shadowColor = useColorModeValue("md", "dark-lg")

  return (
    <Box p={8}>
      <Heading mb={6} color={useColorModeValue("gray.700", "gray.100")}>
        Statistics
      </Heading>

      <Grid gap={6} templateColumns={"repeat(auto-fill, minmax(250px, 1fr))"}>

        <Box p={6} borderRadius="xl" shadow={shadowColor} bg={bgCard} borderLeft="5px solid #3182ce">
          <Text fontSize="4xl" fontWeight="bold" color="#3182ce">
            {user?.length ?? 1200}
          </Text>
          <Text fontSize="lg" color={textColor}>Users</Text>
        </Box>

        <Box p={6} borderRadius="xl" shadow={shadowColor} bg={bgCard} borderLeft="5px solid #38a169">
          <Text fontSize="4xl" fontWeight="bold" color="#38a169">
            {cate?.data?.length ?? 24}
          </Text>
          <Text fontSize="lg" color={textColor}>Categories</Text>
        </Box>

        <Box p={6} borderRadius="xl" shadow={shadowColor} bg={bgCard} borderLeft="5px solid #d69e2e">
          <Text fontSize="4xl" fontWeight="bold" color="#d69e2e">
            {product?.data?.length ?? 120}
          </Text>
          <Text fontSize="lg" color={textColor}>Products</Text>
        </Box>

        <Box p={6} borderRadius="xl" shadow={shadowColor} bg={bgCard} borderLeft="5px solid #805ad5">
          <Text fontSize="4xl" fontWeight="bold" color="#805ad5">
            350
          </Text>
          <Text fontSize="lg" color={textColor}>Orders</Text>
        </Box>

        <Box p={6} borderRadius="xl" shadow={shadowColor} bg={bgCard} borderLeft="5px solid #e53e3e">
          <Text fontSize="4xl" fontWeight="bold" color="#e53e3e">
            $12,500
          </Text>
          <Text fontSize="lg" color={textColor}>Sales</Text>
        </Box>

        <Box p={6} borderRadius="xl" shadow={shadowColor} bg={bgCard} borderLeft="5px solid #ed8936">
          <Text fontSize="4xl" fontWeight="bold" color="#ed8936">
            $8,600
          </Text>
          <Text fontSize="lg" color={textColor}>Revenue</Text>
        </Box>
      </Grid>

      <Grid w={"full"} mt={10} gap={6} templateColumns={{base: "1fr" , md: "3fr 1fr"}}>
        <Box p={6} borderRadius="xl" shadow={shadowColor} bg={bgCard}>
          <LineCarrt />
        </Box>

        <Box p={6} borderRadius="xl" shadow={shadowColor} bg={bgCard}>
          <Heading size="md" mb={4} color={textColor}>Recent Activity</Heading>
          <Flex direction="column" gap={3} color={textColor}>
            <Text>🟢 New user registered — 10 minutes ago</Text>
            <Text>🟡 Order completed — 1 hour ago</Text>
            <Text>🔵 Product added — 2 hours ago</Text>
            <Text>🟣 Category updated — 3 hours ago</Text>
          </Flex>
        </Box>
      </Grid>
    </Box>
  )
}

export default AdminDashboard
