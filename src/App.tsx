import { RouterProvider } from "react-router-dom"
import router from "./router"
import { ToastContainer } from 'react-toastify';
import CartDrawer from "./components/CartDrawer";
const App = () => {


  return (<>
  
    <main>
      <CartDrawer />
      <RouterProvider router={router}></RouterProvider>
        <ToastContainer/>
    </main>
</>)
}

export default App