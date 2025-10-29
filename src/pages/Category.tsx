import { useGetOneCategoryQuery } from "@/app/services/categoryApiSlice"
import { Box, Button, Flex, Grid, Heading } from "@chakra-ui/react"
import { useColorMode } from "@/components/ui/color-mode"
import { useNavigate, useParams } from "react-router-dom"
import type { ICartItem } from "@/interfaces"
import ProductCard from "@/components/ProductCard"
import ProductCardSkeleton from "@/components/skeleton/ProductCardSkeleton"
import { useEffect } from "react"

const Category = () => {
  const navigate = useNavigate()
  const {colorMode} = useColorMode()
  const isDark = colorMode === "dark"
  const { documentId } = useParams<{documentId : string}>()
  const { data, isLoading } = useGetOneCategoryQuery(`${documentId}`);

  useEffect(() => {
    document.title = `${data?.data?.title} Category`
  })
  return <>
    <Box mt={"10px"}>
      <Flex>
        <Button onClick={() => navigate(-1)} variant={"outline"} colorScheme={isDark ? "teal" : "gray"} borderColor={isDark ? "teal.400" : "teal.600"} color={isDark ? "teal.300" : "teal.700"} _hover={{ bg: isDark ? "teal.700" : "teal.100", color: isDark ? "white" : "teal.800",}}>
          Back
        </Button>
        <Heading ml={"5px"} color={isDark ? "teal.300" : "teal.700"} textTransform="capitalize" fontWeight="extrabold" size="2xl" mb="10px">
          Category is{" "}
          <Box as="span" color={isDark ? "yellow.300" : "teal.500"} fontWeight="bold">
            {data?.data?.title}
          </Box>
        </Heading>
      </Flex>
      {isLoading ?
      <Grid margin={30} gap={5} templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}>
        {Array.from({length: 10}, (_, idx)=> (<ProductCardSkeleton key={idx}/>))}
      </Grid>
      :
      <Grid margin={30} gap={5} templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}>
        {data?.data?.products?.map((product : ICartItem) => <ProductCard key={product.id} ProductCard={product}/>)}
      </Grid>}
    </Box>
  </>
  
}

export default Category