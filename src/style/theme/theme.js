import {createTheme} from "@mui/material";

const white = '#fff'
const primaryBlue = '#1c66d8'
const primaryTextLightTheme = '#111111'
const secondaryTextLightTheme = '#6e6e6e'
export const lightTheme = createTheme({
    typography: {
        fontFamily: 'Open Sans, sans-serif'
    },
    components: {
        MuiGrid: {
            styleOverrides: {
                root: {}
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    backgroundColor: white,
                    ":hover": {
                        borderColor: primaryBlue
                    }
                }
            }
        },
    },
    palette: {
        background: {
            default: white,
            paper: white
        },
        primary: {
            main: primaryBlue
        },
        secondary: {
            main: white
        },
        textPrimary: {
            main: primaryTextLightTheme
        },
        textSecondary: {
            main: secondaryTextLightTheme
        },
    },
})

const primaryDarkBackground = '#18191b'
const secondaryDarkBackground = '#242527'
const primaryTextDarkTheme = '#fff'
const secondaryTextDarkTheme = '#e4e5e9'

export const darkTheme = createTheme({
    typography: {
        fontFamily: 'Open Sans, sans-serif',
        allVariants: {
            color: '#f3f3f3'
        }

    },
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {

                    backgroundColor: secondaryDarkBackground,
                    color: primaryTextDarkTheme,
                }
            }
        }
    },
    palette: {
        background: {
            default: primaryDarkBackground,
            paper: secondaryDarkBackground
        },
        primary: {
            main: primaryTextDarkTheme
        },
        secondary: {
            main: secondaryDarkBackground
        },
        textPrimary: {
            main: primaryTextDarkTheme
        },
        textSecondary: {
            main: secondaryTextDarkTheme
        },
    }
})