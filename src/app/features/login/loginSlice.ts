

import axiosInstance from '@/config'
import type { IErrorResponse, ILoginForm, IProduct } from '@/interfaces'
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'



interface IInitialState {
    isLoading: boolean
    data: IProduct[] | null
    error: IErrorResponse | null
}

const initialState: IInitialState = {
    isLoading: false,
    data: null,
    error: null
}
export const userLogin = createAsyncThunk("login/userLogin", async(user : ILoginForm, trunkLogin) => {
    const { rejectWithValue } = trunkLogin
    try {
        const { data } = await axiosInstance.post('/api/auth/local', user)
        return data
    } catch (error: any) {
        
        return rejectWithValue(error.response?.data as IErrorResponse)
    }
})

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(userLogin.pending, (state) => {
            state.isLoading = true
        })
        .addCase(userLogin.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
            toast.success("Login successful", {
                position: "top-center",
                autoClose: 1500,
                theme: "dark"
            })
        })
        .addCase(userLogin.rejected, (state, action: PayloadAction<IErrorResponse | any>) => {
            state.isLoading = false;
            state.data = [];
            state.error = action.payload;
            const errorMessage =
                action.payload?.error?.details?.errors?.[0]?.message ||
                action.payload?.error?.message || "Login failed. Please check your credentials."

            toast.error(errorMessage , {
                position: "top-center",
                autoClose: 1500,
                theme: "dark"
            })
        });

    },
})


export default loginSlice.reducer