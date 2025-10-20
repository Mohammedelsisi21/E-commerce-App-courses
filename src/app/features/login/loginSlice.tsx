

import axiosInstance from '@/config'
import type { ILoginForm, IProduct } from '@/interfaces'
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'


interface IInitialState {
    isLoading: boolean
    data: IProduct[] | null
    error: unknown
}

const initialState: IInitialState = {
    isLoading: false,
    data: [],
    error: null
}
export const userLogin = createAsyncThunk("login/userLogin", async(user : ILoginForm, trunkLogin) => {
    const { rejectWithValue } = trunkLogin
    try {
        const { data } = await axiosInstance.post('/api/auth/local', user)
        return data
    } catch (error) {
        rejectWithValue(error)
    }
})

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(userLogin.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
        });

        builder.addCase(userLogin.rejected, (state, action: PayloadAction<unknown>) => {
            state.isLoading = false;
            state.data = [];
            state.error = action.payload;
        });

    },
})


export default loginSlice.reducer