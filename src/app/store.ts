import { useSelector, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './features/login/loginSlice'


export const store = configureStore({
  reducer: {
    login: loginSlice
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

