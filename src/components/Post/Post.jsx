import React, {useEffect, useState} from "react";
import ReactTimeAgo from "react-time-ago";
import {store} from "../../store/store";
import {useSelector} from "react-redux";
import {Avatar, Button, Grid, Paper, Typography, Box} from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';


export const Post = (props) => {

    const isLoggedIn = useSelector(() => store.getState().isLoggedIn.value)
    const post = props.post
    const newDate = new Date(post.created_at)
    const formattedDate = (newDate.getTime())
    const [isLikedByUser, setIsLikedByUser] = useState(false)
    const [isUsersPost, setIsUsersPost] = useState(false)
    const [isFollowed, setIsFollowed] = useState(false)

    useEffect(() => {
        if (isLoggedIn) {
            if (props.post.user.id.toString() === localStorage.id) {
                setIsUsersPost(true)
            }
            props.post.likes.forEach(like => {
                if (like.id.toString() === localStorage.id) {
                    setIsLikedByUser(true)
                }
            })
            props.allFollowed.forEach(leader => {
                if (leader.id === post.user.id) {
                    setIsFollowed(true)
                }
            })
        }
    }, [])

    function likeButtonHandle() {
        if (isLoggedIn) {
            if (!isLikedByUser) {
                post.likes.push([])
            } else {
                post.likes.pop()
            }
            setIsLikedByUser(!isLikedByUser)
            props.likeDislike(post, isLikedByUser)
        }
    }

    return (
        <Grid sx={{
            marginBottom: '25px',
        }}>
            <Grid item>
                <Paper elevation={5} sx={{padding: '20px 30px'}}>
                    <Grid sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px'
                    }}>
                        <Avatar alt="Remy Sharp" src={post.user.avatar_url} sx={{marginRight: '20px'}}/>
                        <Typography variant={'h6'}
                                    flexGrow={1}>{post.user.username}</Typography>
                        {(!isUsersPost && isLoggedIn) &&
                            <Button color='primary' sx={{display: {xs: 'none', sm: 'block'}}}
                                    onClick={() => props.followUnfollow(post.user.id, isFollowed)}>{isFollowed ? 'Unfollow' : 'Follow'}</Button>}
                        <Typography ml='20px' sx={{fontSize: {xs: '0.8rem', sm: '1rem'}}}><ReactTimeAgo
                            date={formattedDate}
                            locale='en-Us'
                            timeStyle='round'/></Typography>
                    </Grid>
                    <Typography mb='20px' sx={{fontSize: {xs: '0.9rem', sm: '1rem'}}}>{post.content}</Typography>
                    <Grid container alignItems='center'>
                        <Grid display='flex' alignItems='center' sx={{cursor: 'pointer'}}
                              onClick={() => likeButtonHandle()}>
                            {(isLoggedIn && isLikedByUser) ? <FavoriteOutlinedIcon color='primary'/> :
                                <FavoriteBorderOutlinedIcon color='primary'/>}
                            <Typography fontSize='16px' ml='5px'>{post.likes.length}</Typography>
                        </Grid>
                        <Box flexGrow='1'/>
                        <Grid item display='flex' alignItems='center' sx={{cursor: 'pointer'}}
                              onClick={() => props.postDelete(post)}>
                            {(isUsersPost && isLoggedIn) &&
                                <DeleteOutlineOutlinedIcon color='primary'/>}
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}