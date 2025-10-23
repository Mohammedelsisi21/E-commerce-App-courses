import { Container, Grid } from "@chakra-ui/react"
import ProductCard from "../components/ProductCard"
import type { ICartItem } from "../interfaces"
import ProductCardSkeleton from "@/components/ProductCardSkeleton"
import useAuthenticatedQuery from "../hooks"

const ProductsPage = () => {

    const {data, isLoading} = useAuthenticatedQuery({
        queryKey: ["products"],
        action: "get",
        url: "/api/products?populate[0]=thumbnail&populate[1]=category&sort[createdAt]=desc",
    })
    if(isLoading) return <Grid margin={30} gap={5} templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}>
    {Array.from({length: 10}, (_, idx)=> (<ProductCardSkeleton key={idx}/>))}
    </Grid>

    return (<Container>
        <Grid margin={30} gap={5} templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}>
            {data?.data?.map((product : ICartItem) => <ProductCard key={product.id} ProductCard={product}/>)}
        </Grid>
    </Container>
)
}

export default ProductsPage