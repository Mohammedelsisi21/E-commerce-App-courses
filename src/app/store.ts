import { useSelector, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './features/login/loginSlice'
import registerSlice from './features/register/registerSlice'
import cartSlice from './features/cart/cartSlice'
import globalSlice from './features/global/globalSlice'



export const store = configureStore({
  reducer: {
    cart: cartSlice,
    login: loginSlice,
    register: registerSlice,
    global: globalSlice
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

