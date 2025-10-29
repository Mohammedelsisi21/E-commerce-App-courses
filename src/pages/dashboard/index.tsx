import { Box, Heading } from "@chakra-ui/react"
import { useEffect } from "react"

const AdminDashboard = () => {

  useEffect(() => {
    document.title = `Dashboard Admin`
  })
  return (
    <Box>
        <Heading>
            AdminDashboard
        </Heading>
    </Box>
  )
}

export default AdminDashboard