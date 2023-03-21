import React, {useEffect, useState} from 'react';
import {Button, Grid, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';
import {logInApiCall} from "../../api/api";
import {useNavigate} from "react-router-dom";
import {logIn} from "../../store/isLoggedInSlice";
import {useDispatch} from "react-redux";
import {changeLoaderState} from "../../store/isActiveLoaderSlice";
import Dialog from '@mui/material/Dialog';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function Login() {

    const defaultValues = {
        username: "",
        password: "",
    };

    const [formData, setFormData] = useState(defaultValues)
    const [isDialogVisible, setIsDialogVisible] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            setIsDialogVisible(true)
        }, 2000)
    }, [])


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    async function handleSubmit(e) {
        e.preventDefault()
        dispatch(changeLoaderState(true))
        const response = await logInApiCall(formData)
        dispatch(changeLoaderState(false))
        if (response.data.error === true) {
        } else {
            dispatch(logIn())
            localStorage.setItem('username', response.data.username)
            localStorage.setItem('id', response.data.id)
            localStorage.setItem('jwt_token', response.data.jwt_token)
            localStorage.setItem('ttl', response.data.ttl)
            navigate('/social-app-2.0/')
        }
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)} style={{marginTop: '20vh'}}>
            <Dialog open={isDialogVisible} onClick={() => setIsDialogVisible(false)}>
                {/*<DialogTitle>Set backup account</DialogTitle>*/}
                <Typography padding={2}>Welcome! In this application you will be able to log in on test user's profiles,
                    provided by
                    API
                    developers Akademia 108. Please
                    contact me on E-mail: <a
                        href="mailto:bessarab.d.p@gmail.com">Bessarab.d.p@gmail.com</a> to get test user's login and
                    password.</Typography>
            </Dialog>
            <Grid
                container
                alignItems="center"
                justify="center"
                direction="column"
            >
                <Paper elevation={3} sx={{padding: '25px 20px'}}>
                    <Grid
                        container
                        alignItems="center"
                        justify="center"
                        direction="column"
                    >
                        <Grid item display='flex' flexDirection='row' alignItems='center' mb='25px'>
                            <Typography variant="h6" mr={2}>Social-app </Typography>
                            <HelpOutlineIcon color='primary' cursor='pointer' onClick={() => setIsDialogVisible(true)}/>
                        </Grid>
                        <Grid item>
                            <TextField
                                id="username-input"
                                name="username"
                                label="Username"
                                type="text"
                                value={formData.username}
                                onChange={handleInputChange}
                                size='small'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle color='textPrimary'/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="password-input"
                                name="password"
                                label="Password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className='text-input'
                                size='small'
                                margin='normal'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PasswordRoundedIcon color='textPrimary'/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"

                            sx={{
                                marginTop: 2,
                                textTransform: 'none',
                                borderRadius: 5,
                                padding: '5px 20px'
                            }}
                        >
                            Sign In
                        </Button>
                    </Grid>
                </Paper>
            </Grid>
        </form>
    )
}
