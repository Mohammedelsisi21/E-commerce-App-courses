import { useSelector, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './features/login/loginSlice'
import registerSlice from './features/register/registerSlice'
import cartSlice from './features/cart/cartSlice'
import globalSlice from './features/global/globalSlice'
import { productApiSlice } from './services/productApiSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { setupListeners } from '@reduxjs/toolkit/query';
import { categoryApiSlice } from './services/categoryApiSlice';

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
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
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
  }).concat(productApiSlice.middleware).concat(categoryApiSlice.middleware)
  
})

export const persister = persistStore(store)

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()


