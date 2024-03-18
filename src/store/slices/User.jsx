import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";

function getAuthUser() {
    const user = JSON.parse(localStorage.getItem("user"))
    return user ? [user] : user
}

const UserSlices = createSlice({
    name: 'user',
    initialState: getAuthUser() || [],
    reducers: {
        login(state, action) {
            localStorage.setItem("user", JSON.stringify(action.payload))
            state = action.payload
        },
        logout(state, action) {
            localStorage.clear()
            state.pop()
        }
    }
})

export const { login, logout } = UserSlices.actions
export default UserSlices.reducer