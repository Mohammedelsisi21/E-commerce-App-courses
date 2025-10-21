import axiosInstance from "@/config";
import type { IErrorResponse, IRegisterForm, IUserData } from "@/interfaces";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";



interface IInitialState {
    isLoading: boolean
    userData: IUserData | null
    error: IErrorResponse | null
}

const initialState: IInitialState= {
    isLoading: false,
    userData: null,
    error: null
}

export const userRegister = createAsyncThunk< IUserData ,IRegisterForm, { rejectValue: IErrorResponse } >("register/userRegister", async(user, trunkrRegister )=>{
    const { rejectWithValue } = trunkrRegister
    try {
        const {data} = await axiosInstance.post("api/auth/local/register",user)
        return data
    } catch (err) {
        const error = err as AxiosError<{ message: string , error: {message: string}}>
        if(error.response) {
            const message = error.response.data.error.message || "Register failed. Please check your credentials"
            return rejectWithValue({error: {details: {errors: [{message: message}]},
                message
            }})
        }
        if(error.request) {
            return rejectWithValue({error: {details: {errors: [{message: "No response from server. Please try again later"}]},
                message: "Nwtwork Error"
            }})
        }
        return rejectWithValue({error: {details: {errors: [{message: "Something went wrong. Please try again."}]},
            message: "Unexpected error."
        }})
    }
})
const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers:{},
    extraReducers: (bulider) => {
        bulider
        .addCase(userRegister.pending, (state) => {
            state.isLoading = true
        })
        .addCase(userRegister.fulfilled, (state, action: PayloadAction<IUserData>) => {
            state.isLoading = false
            state.userData = action.payload
            state.error = null
            toast.success("Register successful", {
                position: "top-center",
                autoClose: 700,
                theme: "dark"
            })
        })
        .addCase(userRegister.rejected, (state, action : PayloadAction<IErrorResponse | undefined>) => {
            state.isLoading = false
            state.userData = null
            state.error = action.payload || null
            toast.error(action.payload?.error?.details?.errors[0]?.message, {
                position: "top-center",
                autoClose: 1000,
                theme: "dark"
            })

        })
    }
})


export default registerSlice.reducer