import { Provider as Chakra } from "@/components/ui/provider"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import App from './App.tsx'
import { store } from "./app/store.ts"
import { Provider } from "react-redux"

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Chakra>
        <App />
      </Chakra>
    </QueryClientProvider>
  </Provider>
  </StrictMode>,
)
