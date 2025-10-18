import { Grid } from "@chakra-ui/react"
import ProductCard from "../components/ProductCard"
import type { IProduct } from "../interfaces"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

const ProductsPage = () => {

    const getProducts = async () => {
        const {data} = await axios.get(`${import.meta.env.VITE_LOCAL_API}/api/products?populate[0]=thumbnail&populate[1]=category`)
        return data
    }
    
    const {data, isLoading} = useQuery({
        queryKey: ["products"],
        queryFn: getProducts
    })

    if(isLoading) return "isLoading"
    
    return (
        <Grid margin={30} gap={5} templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}>
            {data?.data?.map((product : IProduct) => <ProductCard key={product.id} ProductCard={product}/>)}
        </Grid>
)
}

export default ProductsPage