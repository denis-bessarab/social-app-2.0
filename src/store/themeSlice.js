import {createSlice} from "@reduxjs/toolkit";

const themeSlice = createSlice({
    initialState: {
        value: (localStorage.theme ? localStorage.theme : 'light')
    },
    name: 'themeSlice',
    reducers: {
        switchTheme: (state) => {
            state.value = (state.value === 'light' ? 'dark' : 'light')
            localStorage.setItem('theme', state.value)
        }
    }
})

export const {switchTheme} = themeSlice.actions
export default themeSlice.reducer