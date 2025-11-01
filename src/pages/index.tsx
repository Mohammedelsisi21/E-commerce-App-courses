import SliderPage from "@/components/slider/SliderPage"
import ProductsPage from "./Products"
import SliderCategory from "@/components/slider/SliderCategory"
import { useEffect } from "react"

const HomePage = () => {
      useEffect(() => {
          document.title = `Fresh Cart`
      })
  
  return (
    <>
      <SliderPage />
      <SliderCategory />
      <ProductsPage />
    </>
  )
}

export default HomePage