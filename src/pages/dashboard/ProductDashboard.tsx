import DashboardProduct from "@/components/DashboardProduct"
import { useEffect } from "react"

const Products = () => {
  useEffect(() => {
      document.title = `Dashboard Product`
    })
  return (<>
      <DashboardProduct />
    </>
  )
}

export default Products