import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import {IconButton} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LogoutIcon from '@mui/icons-material/Logout';
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../store/isLoggedInSlice";
import {store} from "../../store/store";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";

export default function MobileMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(() => store.getState().isLoggedIn.value)
    const navigate = useNavigate()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{display: {md: 'none'}}}>
            <IconButton
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                onClick={handleClick}
                color={'textPrimary'}
            >
                <MenuIcon/>
            </IconButton>
            <Menu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {!isLoggedIn &&
                    <MenuItem onClick={() => {
                        handleClose();
                        navigate('/social-app-2.0/login')
                    }} disableRipple>
                        <LoginIcon sx={{mr: 2}}/>
                        Sing In
                    </MenuItem>}
                {!isLoggedIn && <MenuItem onClick={() => {
                    handleClose();
                    navigate('/social-app-2.0/signup')
                }} disableRipple>
                    <PersonAddIcon sx={{mr: 2}}/>
                    Sign Up
                </MenuItem>}
                {isLoggedIn && <MenuItem onClick={() => {
                    handleClose();
                    navigate('/social-app-2.0/subscriptions')
                }} disableRipple>
                    <BookmarkIcon sx={{mr: 2}}/>
                    Subscriptions
                </MenuItem>}
                {isLoggedIn && <Divider sx={{my: 0.5}}/>}
                {isLoggedIn && <MenuItem onClick={() => {
                    handleClose();
                    dispatch(logOut())
                }} disableRipple>
                    <LogoutIcon sx={{mr: 2}}/>
                    Log Out
                </MenuItem>}
            </Menu>
        </Box>
    );
}