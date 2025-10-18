import { Grid } from "@chakra-ui/react"
import ProductCard from "../components/ProductCard"
import { useEffect, useState } from "react"
import type { IProduct } from "../interfaces"
import axios from "axios"

const ProductsPage = () => {
// const defaultProduct = {
//     id: 0,
//     title: "",
//     description: "",
//     documentId: "",
//     category: {
//         title: ""
//     },
//     thumbnail: {
//         url:""
//     }}
    
    const [productList, setProductList] = useState<IProduct[]>([])

    useEffect(() =>{
        (async ()=> {
            await axios.get(`${import.meta.env.VITE_LOCAL_API}/api/products?populate[0]=thumbnail&populate[1]=category`)
            .then(res => setProductList(res.data.data))
        })()
    },[])
    return (
        <Grid margin={30} gap={5} templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}>
            {productList.map((product) => <ProductCard key={product.id} ProductCard={product}/>)}
        </Grid>
)
}

export default ProductsPage