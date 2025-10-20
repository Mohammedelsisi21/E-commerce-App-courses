import { RouterProvider } from "react-router-dom"
import router from "./router"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { ToastContainer } from 'react-toastify';

const App = () => {

  return (<>
  <Provider store={store}>
    <main>
      <RouterProvider router={router}></RouterProvider>
        <ToastContainer/>
    </main>
  </Provider>
</>)
}

export default App