import {Outlet} from "react-router-dom";
import AppNavbar from "./components/AppNavbar/AppNavbar";
import * as React from "react";
import {lightTheme} from "./style/theme/theme";
import {darkTheme} from "./style/theme/theme";
import {Backdrop, CircularProgress, CssBaseline, ThemeProvider} from "@mui/material";
import {store} from "./store/store";

import {useSelector} from "react-redux";
import Feed from "./components/Feed/Feed";
import {useLocation} from "react-router-dom";


export default function NewApp() {
    const currentTheme = useSelector(() => store.getState().theme.value)
    const location = useLocation().pathname
    const isLoading = useSelector(() => store.getState().isActiveLoader.value)

    return (
        <>
            <ThemeProvider theme={currentTheme === "light" ? lightTheme : darkTheme}>
                <CssBaseline/>
                <AppNavbar/>
                {location === "/social-app-2.0/" && <Feed/>}
                <Outlet/>
                <Backdrop
                    sx={{color: (theme) => theme.palette.primary.main, zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={isLoading}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
            </ThemeProvider>
        </>
    );
}