import type { ICartItem } from "@/interfaces";
import { addCartDrawerQuantity } from "@/utils";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


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
            toast.success(`Added 1 more successful.`, {
            position: "bottom-right",
            autoClose: 500,
            theme: "colored",
            });
        },
        removeFromCart: (state, action : PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload)
            toast.success(`Removed from cart.`, {
            position: "bottom-right",
            autoClose: 500,
            theme: "colored",
            });
        },
        increaseQty: (state, action : PayloadAction<number>) => {
            const item = state.cartItems.find(item => item.id === action.payload)
            if(item) item.qty += 1
            toast.success(`Added 1 more ${item?.title.split(" ").slice(0, 2).join(" ")}`, {
            position: "bottom-right",
            autoClose: 500,
            theme: "colored",
            });
        },
        decreaseQty: (state, action: PayloadAction<number>) => {
            const item = state.cartItems.find(item => item.id === action.payload)
            if(item && item.qty > 1) item.qty -=1
            toast.success(`${item?.title.split(" ").slice(0, 2).join(" ")} - 1`, {
            position: "bottom-right",
            autoClose: 500,
            theme: "colored",
            });
        },
        removeCartAll: (state) => {
            state.cartItems = []
        }
    }
})

export const { addCartItmesAction, removeFromCart, removeCartAll, increaseQty, decreaseQty } = cartSlice.actions
export default cartSlice.reducer