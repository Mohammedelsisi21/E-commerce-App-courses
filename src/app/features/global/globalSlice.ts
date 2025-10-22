import { createSlice } from "@reduxjs/toolkit";


interface IInitialState {
    isOpenCartDrawer: boolean
}
const initialState :IInitialState = {
    isOpenCartDrawer: false,
}
const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        onChangeOpen: (state) => {
            state.isOpenCartDrawer= !state.isOpenCartDrawer
        },
    }
})

export const { onChangeOpen } = globalSlice.actions
export default globalSlice.reducer