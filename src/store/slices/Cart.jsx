import { createSlice } from "@reduxjs/toolkit";

const getCartProducts = () => {
    const products = JSON.parse(localStorage.getItem('cart'))
    return products
}

const cartSlices = createSlice({
    name: 'cart',
    initialState: getCartProducts() || [],
    reducers: {
        addProduct(state, action) {
            state.push(action.payload)
            localStorage.setItem('cart', JSON.stringify(state))
        },

        removeProduct(state, action) {
            let indexForRemove = state.findIndex(product => product.id === action.payload)
            state.splice(indexForRemove, 1)
            localStorage.setItem('cart', JSON.stringify(state))
        },

        clearCartItems(state, action) {
            localStorage.removeItem('cart')
            return []
        }
    }
})

export const { addProduct, removeProduct, clearCartItems } = cartSlices.actions
export default cartSlices.reducer