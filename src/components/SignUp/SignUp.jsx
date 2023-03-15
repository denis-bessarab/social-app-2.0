import React, {useState} from 'react';
import {Backdrop, Button, CircularProgress, Grid, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';
import {useNavigate} from "react-router-dom";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import {signup} from "../../api/api";
import {useDispatch} from "react-redux";
import {changeLoaderState} from "../../store/isActiveLoaderSlice";


export default function SignUp() {

    const defaultValues = {
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
    };

    const [formData, setFormData] = useState(defaultValues)
    const [signingUpSuccess, setSigningUpSuccess] = useState(false);
    const [username, setUsername] = useState(null)
    const navigate = useNavigate();
    const dispatch = useDispatch()


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
        const response = await signup(formData)
        dispatch(changeLoaderState(false))
        if (response.data.signedup === false) {
            if (response.data.message.username !== undefined) {
            }
            if (response.data.message.email !== undefined) {
            }
        } else {
            setUsername(response.data.user.username)
            setSigningUpSuccess(true)
            setTimeout(() => {
                navigate("/social-app-2.0/login", {replace: true})
            }, 2000)
        }
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)} style={{marginTop: '20vh'}}>
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
                        <Grid item>
                            <Typography mb='25px' variant="h6">Social-app</Typography>
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
                                margin='normal'
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
                                id="email-input"
                                name="email"
                                label="E-Mail"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                size='small'
                                margin='normal'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AlternateEmailIcon color='textPrimary'/>
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
                        <Grid item>
                            <TextField
                                id="password-confirm-input"
                                name="passwordConfirm"
                                label="Confirm Password"
                                type="password"
                                value={formData.passwordConfirm}
                                onChange={handleInputChange}
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
                            Sign Up
                        </Button>
                    </Grid>
                </Paper>
            </Grid>

        </form>
    )
}
