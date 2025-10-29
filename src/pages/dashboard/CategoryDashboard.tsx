import DashboardCategory from "@/components/DashboardCategory"
import { useEffect } from "react"

const Categories = () => {
  useEffect(() => {
      document.title = `Dashboard Category`
    })
    
  return (
    <DashboardCategory />
  )
}

export default Categories