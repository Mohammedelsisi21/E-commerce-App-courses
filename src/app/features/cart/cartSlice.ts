import type { IProduct } from "@/interfaces";
import { addCartDrawerQuantity } from "@/utils";
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
            state.cartItems = addCartDrawerQuantity(state.cartItems, action.payload)
        }
    }
})

export const { addCartItmesAction } = cartSlice.actions
export default cartSlice.reducer