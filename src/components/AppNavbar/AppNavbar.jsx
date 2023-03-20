import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {Link, useNavigate} from "react-router-dom";
import {Button, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {switchTheme} from "../../store/themeSlice";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import {store} from "../../store/store";
import {useTheme} from '@mui/material/styles';
import {logOut} from "../../store/isLoggedInSlice";
import MobileMenu from "./MobileMenu";

export default function AppNavbar() {
    const theme = useTheme();
    const isLoggedIn = useSelector(() => store.getState().isLoggedIn.value)
    const dispatch = useDispatch()
    const currentTheme = useSelector(() => store.getState().theme.value)
    const navigate = useNavigate();


    return (
        <Box sx={{flexGrow: 1, position: 'fixed', top: '0', width: '100%', zIndex: 2}}>
            <AppBar position="static" color={'secondary'}>
                <Toolbar>
                    <Typography
                        onClick={() => navigate('/social-app-2.0/')}
                        color='primary'
                        variant='h6'
                        sx={{
                            mr: 2,
                            fontSize: {xs: '1rem', md: '1.3rem'},
                            cursor: 'pointer'
                        }}
                    >
                        Social-app
                    </Typography>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="open drawer"
                        onClick={() => dispatch(switchTheme())}
                        color={'textPrimary'}
                    >
                        {currentTheme === 'light' ? <DarkModeOutlinedIcon/> : <LightModeOutlinedIcon/>}
                    </IconButton>
                    <Box sx={{flexGrow: 1}}/>
                    {isLoggedIn && localStorage.username &&
                        <Box display='flex' flexDirection='row' alignItems='center'
                             sx={{marginRight: {xs: '5px', md: '50px'}}}>
                            <Typography variant='h6' mx='10px' style={{
                                color: theme.palette['textPrimary'].main,
                            }}
                            >{localStorage.username}</Typography>
                            <AccountCircle color='primary'/>
                        </Box>}
                    {!isLoggedIn && <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        <Link to={`/social-app-2.0/login`} style={{textDecoration: 'none'}}>
                            <Button variant="outlined" color={'primary'}
                                    sx={{mr: 2, borderRadius: 5, textTransform: 'none'}}>Sign In</Button>
                        </Link>
                        <Link to={`/social-app-2.0/signup`} style={{textDecoration: 'none'}}>
                            <Button variant="contained" color={'primary'}
                                    sx={{mr: 2, borderRadius: 5, textTransform: 'none'}}>Sign Up</Button>
                        </Link>
                    </Box>}
                    {isLoggedIn && <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        <Button
                            variant="contained"
                            color={'primary'}
                            sx={{mr: 2, borderRadius: 5, textTransform: 'none'}}
                            onClick={() => dispatch(logOut())}
                        >Logout</Button>
                    </Box>}
                    <MobileMenu/>
                </Toolbar>
            </AppBar>
        </Box>
    );
}