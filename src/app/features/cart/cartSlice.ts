import type { IProduct } from "@/interfaces";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface IInitialState {
    cartItems: IProduct[]
}
const initialState :IInitialState = {
    cartItems: []
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCartItmesAction: (state, action : PayloadAction<IProduct>) => {
            state.cartItems = [...state.cartItems, action.payload]
        }
    }
})

export const { addCartItmesAction } = cartSlice.actions
export default cartSlice.reducer