import { RouterProvider } from "react-router-dom"
import router from "./router"
import { ToastContainer } from 'react-toastify';
const App = () => {


  return (<>
  
    <main>
      <RouterProvider router={router}></RouterProvider>
        <ToastContainer/>
    </main>
</>)
}

export default App