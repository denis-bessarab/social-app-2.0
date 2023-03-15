import React, {useEffect, useState} from "react";
import {followUnfollowUserApiCall, getRecommendationsApiCall} from "../../api/api";
import Box from "@mui/material/Box";
import {Avatar, Button, Grid, Paper, Typography} from "@mui/material";

export const Suggestions = (props) => {

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
        <Grid mb='50px'>
            <Paper elevation={3} sx={{padding: '20px', display: 'flex', flexDirection: 'column'}}>
                <Typography textAlign='center' variant='h6' mb='20px'>Suggestions for you</Typography>
                {recUsers.map(user => {
                    return (
                        <Grid
                            key={user.id}
                            p='20px'
                            display='flex'
                            flexDirection='row'
                            flexWrap='wrap'
                            alignItems='center'
                        >
                            <Avatar src={user.avatar_url}/>
                            <Typography mx='20px' variant='h6'>{user.username}</Typography>
                            <Button sx={{
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                marginLeft: 'auto'
                            }} variant='outlined' onClick={() => follow(user.id)}>Follow</Button>
                        </Grid>
                    )
                })}
            </Paper>
        </Grid>
    )
}

