import {createSlice} from "@reduxjs/toolkit";

const isLoggedInSlice = createSlice({
    initialState: {
        value: !!localStorage.jwt_token
    },
    name: 'isLoggedInSlice',
    reducers: {
        logOut: (state) => {
            localStorage.clear()
            state.value = false
        },
        logIn: (state) => {
            state.value = true
        },
    }
})

export const {logOut, logIn} = isLoggedInSlice.actions
export default isLoggedInSlice.reducer