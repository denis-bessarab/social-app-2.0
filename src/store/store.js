import {configureStore} from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import isLoggedInSlice from "./isLoggedInSlice";
import isActiveLoaderSlice from "./isActiveLoaderSlice";

export const store = configureStore({
    reducer: {
        theme: themeSlice,
        isLoggedIn: isLoggedInSlice,
        isActiveLoader: isActiveLoaderSlice
    }
})