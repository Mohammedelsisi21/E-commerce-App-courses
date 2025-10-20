import { RouterProvider } from "react-router-dom"
import router from "./router"
import { Provider } from "react-redux"
import { store } from "./app/store"

const App = () => {
  return (<>
  <Provider store={store}>
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  </Provider>
</>)
}

export default App