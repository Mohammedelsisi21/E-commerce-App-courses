import { useSelector, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './features/login/loginSlice'
import registerSlice from './features/register/registerSlice'
import cartSlice from './features/cart/cartSlice'
import globalSlice from './features/global/globalSlice'
import { apiSlice } from './services/APiSlice'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { setupListeners } from '@reduxjs/toolkit/query';
const persistCartConfig = {
  key: 'root',
  storage,
}
const persistedCart = persistReducer(persistCartConfig, cartSlice)

export const store = configureStore({
  reducer: {
    cart: persistedCart,
    login: loginSlice,
    register: registerSlice,
    global: globalSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
      ]
    }
  }).concat(apiSlice.middleware)
  
})

export const persister = persistStore(store)

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()


