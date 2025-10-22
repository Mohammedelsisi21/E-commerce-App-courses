import type { ICartItem } from "@/interfaces";
import { addCartDrawerQuantity } from "@/utils";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface IInitialState {
    cartItems: ICartItem[]
}
const initialState :IInitialState = {
    cartItems: []
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCartItmesAction: (state, action : PayloadAction<ICartItem>) => {
            state.cartItems = addCartDrawerQuantity(state.cartItems, action.payload)
        },
        removeFromCart: (state, action : PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload)
        },
        increaseQty: (state, action : PayloadAction<number>) => {
            const itme = state.cartItems.find(item => item.id === action.payload)
            if(itme) itme.qty += 1
        },
        decreaseQty: (state, action: PayloadAction<number>) => {
            const item = state.cartItems.find(item => item.id === action.payload)
            if(item && item.qty > 1) item.qty -=1
        },
        removeCartAll: (state) => {
            state.cartItems = []
        }
    }
})

export const { addCartItmesAction, removeFromCart, removeCartAll, increaseQty, decreaseQty } = cartSlice.actions
export default cartSlice.reducer