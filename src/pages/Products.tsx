import { Grid } from "@chakra-ui/react"
import ProductCard from "../components/ProductCard"

const ProductsPage = () => {
  return (
    <Grid margin={30} gap={5} templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}>
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    </Grid>
  )
}

export default ProductsPage