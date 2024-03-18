import { combineReducers } from "@reduxjs/toolkit";
import UserReducer from '../slices/User'
import CartReducer from '../slices/Cart'
export const rootReducer = combineReducers({
    user: UserReducer,
    cart: CartReducer
})