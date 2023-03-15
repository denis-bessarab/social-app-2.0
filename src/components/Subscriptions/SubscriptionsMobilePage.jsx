import React, {useEffect, useState} from "react";
import {Avatar, Button, Grid, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {changeLoaderState} from "../../store/isActiveLoaderSlice";
import {followUnfollowUserApiCall, getAllFollowsApiCall} from "../../api/api";
import {useDispatch, useSelector} from "react-redux";
import {store} from "../../store/store";

export default function SubscriptionsMobilePage() {

    const [allFollowed, setAllFollowed] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false)
    const dispatch = useDispatch()


    useEffect(() => {
        subscriptionsUpdate()
    }, [])

    async function subscriptionsUpdate() {
        dispatch(changeLoaderState(true))
        const response = await getAllFollowsApiCall()
        if (response.status === 200) {
            setAllFollowed(response.data)
            if (!response.data[0]) {
                setIsEmpty(true)
            }
        } else {
        }
        dispatch(changeLoaderState(false))
    }

    const followUnfollow = (userId, isFollowed) => {
        let data = {
            leader_id: userId
        }
        followUnfollowUserApiCall(data, isFollowed)
            .then(r => {
                subscriptionsUpdate()
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <Grid>
            <Box sx={{display: 'flex', flexDirection: 'column', mt: '50px'}}>
                {isEmpty &&
                    <Typography textAlign='center' variant='h6'>You have no active subscriptions yet</Typography>}
                {allFollowed.map(user => {
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
                            }} variant='outlined' onClick={() => followUnfollow(user.id, true)}>Unfollow</Button>
                        </Grid>
                    )
                })}
            </Box>
        </Grid>
    )
}
