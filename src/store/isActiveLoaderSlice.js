import {createSlice} from "@reduxjs/toolkit";

const isActiveLoader = createSlice({
    initialState: {
        value: false
    },
    name: 'isActiveLoaderSlice',
    reducers: {
        changeLoaderState: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {changeLoaderState} = isActiveLoader.actions
export default isActiveLoader.reducer