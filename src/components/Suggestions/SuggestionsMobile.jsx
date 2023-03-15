import React, {useEffect, useState} from "react";
import {followUnfollowUserApiCall, getRecommendationsApiCall} from "../../api/api";
import {Avatar, Backdrop, Button, CircularProgress, Grid, IconButton, Paper, Typography} from "@mui/material";
import SyncIcon from '@mui/icons-material/Sync';
import {switchTheme} from "../../store/themeSlice";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

export const SuggestionsMobile = (props) => {

    const [recUsers, setRecUsers] = useState([])

    function recUpdate() {
        getRecommendationsApiCall()
            .then(r => {
                setRecUsers(r.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        recUpdate()
    }, [])
    const follow = (userId) => {
        let data = {
            leader_id: userId
        }
        followUnfollowUserApiCall(data, false)
            .then(r => {
                props.subscriptionsUpdate()
                props.updatePosts()
            })
            .catch(e => {
                console.log(e)
            })
        recUpdate()
    }

    return (
        <Grid mb='50px' sx={{display: {xs: (recUsers[0] ? 'block' : 'none'), md: 'none'}}}>
            <Paper elevation={3} sx={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                position: 'relative',
            }}>
                <IconButton
                    size="large"
                    edge="start"
                    aria-label="open drawer"
                    onClick={() => recUpdate()}
                    color={'primary'}
                    sx={{position: 'absolute', right: '0', top: '0', padding: '20px'}}
                >
                    <SyncIcon/>
                </IconButton>

                <Typography flexBasis='100%' textAlign='center' variant='h6' mb='20px'>Suggestions for you</Typography>
                {recUsers.map(user => {
                    return (
                        <Grid
                            item
                            key={user.id}
                            display='flex'
                            flexDirection='column'
                            flexWrap='wrap'
                            alignItems='center'
                            xs={4}
                        >
                            <Avatar src={user.avatar_url}/>
                            <Typography variant='h6' mb={2}>{user.username}</Typography>
                            <Button sx={{
                                borderRadius: '20px',
                                fontSize: '0.7rem',
                            }} variant='outlined' onClick={() => follow(user.id)}>Follow</Button>
                        </Grid>
                    )
                })}
            </Paper>
        </Grid>
    )
}

