

import axiosInstance from '@/config'
import type { IErrorResponse, ILoginForm, IUserData } from '@/interfaces'
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import cookiesServices from "../../../Services"
import type { AxiosError } from 'axios'



interface IInitialState {
    isLoading: boolean
    data: IUserData | null
    error: IErrorResponse | null
}

const initialState: IInitialState = {
    isLoading: false,
    data: null,
    error: null
}
export const userLoginAdmin = createAsyncThunk<IUserData, ILoginForm, {rejectValue: IErrorResponse}>("login/userLoginAdmin", async(user, trunkLogin) => {
    const { rejectWithValue } = trunkLogin
    try {
        const { data } = await axiosInstance.post('/api/auth/local', user)
        return data
    } catch (err) {
        const error = err as AxiosError<{ error?: { message?: string } }>
    if (error.response) {
        const message =
            error.response.data?.error?.message ||
            "Login failed. Please check your credentials.";
        return rejectWithValue({
            error: {
                details: { errors: [{ message }] },
            message,
            },
        });
    }
    if(error.request) {
        return rejectWithValue({
            error: {
                details: {errors: [{message: "No response from server. Please try again later."}]},
                message: "NetWork Error"
            }
        })
    }
    return rejectWithValue({
        error: {
            details: { errors: [{ message: "Something went wrong. Please try again." }] },
            message: "Unexpected error",
        },
    });

    }
})

const loginAdminSlice = createSlice({
    name: "loginAdmin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(userLoginAdmin.pending, (state) => {
            state.isLoading = true
        })
        .addCase(userLoginAdmin.fulfilled, (state, action: PayloadAction<IUserData>) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
            toast.success("Login successful", {
                position: "top-center",
                autoClose: 700,
                theme: "dark"
            })
            const date = new Date();
            date.setDate(date.getDate() + 3);
            cookiesServices.set('jwt_Admin', action.payload.jwt, { path: '/dashboard', expires: date });
        })
        .addCase(userLoginAdmin.rejected, (state, action: PayloadAction<IErrorResponse | undefined>) => {
            state.isLoading = false;
            state.data = null;
            state.error = action.payload || null;
            toast.error(action.payload?.error?.details?.errors[0]?.message , {
                position: "top-center",
                autoClose: 1500,
                theme: "dark"
            })
        });

    },
})


export default loginAdminSlice.reducer