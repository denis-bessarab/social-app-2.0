import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {store} from "../../store/store";
import {
    deletePostApiCall, followUnfollowUserApiCall,
    getAllFollowsApiCall,
    getLatestPosts, getOlderPostsApiCall,
    likeDislikeApiCall
} from "../../api/api";
import {Container, Grid} from "@mui/material";
import {Post} from "../Post/Post";
import PostAdd from "../PostAdd/PostAdd";
import {changeLoaderState} from "../../store/isActiveLoaderSlice";
import {Suggestions} from "../Suggestions/Suggestions";
import Subscriptions from "../Subscriptions/Subscriptions";
import {SuggestionsMobile} from "../Suggestions/SuggestionsMobile";
import InfiniteScroll from "react-infinite-scroll-component";


function Feed() {
    const [latestPosts, latestPostsUpdate] = useState([]);
    const isLoggedIn = useSelector(() => store.getState().isLoggedIn.value)
    const [allFollowed, setAllFollowed] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        updatePosts()
        if (isLoggedIn)
            subscriptionsUpdate()
    }, [])

    function updatePosts() {
        dispatch(changeLoaderState(true))
        getLatestPosts()
            .then(r => {
                dispatch(changeLoaderState(false))
                if (r.data.error === true) {
                } else {
                    latestPostsUpdate(r.data);
                }
            })
            .catch(e => {
                dispatch(changeLoaderState(false))
                console.log("error" + e)
            })
    }

    const getOlderPosts = () => {
        dispatch(changeLoaderState(true))

        let lastPostDate = {
            date: latestPosts[latestPosts.length - 1].created_at
        }
        getOlderPostsApiCall(lastPostDate)
            .then((res) => {
                let newFeed = latestPosts.concat(res.data)
                latestPostsUpdate(newFeed)
                dispatch(changeLoaderState(false))
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
                dispatch(changeLoaderState(false))
            });

    }

    async function postDelete(post) {
        let newFeed = latestPosts.filter((postToDelete) => {
            return postToDelete !== post
        })
        latestPostsUpdate(newFeed)
        let Data = {
            post_id: post.id
        }
        const response = await deletePostApiCall(Data)
        if (response.status === 200) {

        } else {
            updatePosts()
        }
    };

    async function subscriptionsUpdate() {
        dispatch(changeLoaderState(true))
        const response = await getAllFollowsApiCall()
        if (response.status === 200) {
            setAllFollowed(response.data)
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
                updatePosts()
            })
            .catch(e => {
                console.log(e)
            })
    }


    async function likeDislike(post, isLikedByUser) {
        let postID = {
            post_id: post.id
        }
        const response = await likeDislikeApiCall(postID, isLikedByUser)
    }

    return (
        <InfiniteScroll
            dataLength={latestPosts.length}
            next={() => getOlderPosts()}
            hasMore={true}
        >
            <Container>
                <Grid container mt='50px' spacing={5}>
                    <Grid item xs={12} md={7} lg={8} sx={{marginX: {md: (isLoggedIn ? 'none' : 'auto'), lg: 'auto'}}}>
                        {isLoggedIn && <PostAdd latestPosts={latestPosts} updatePosts={updatePosts}/>}
                        {isLoggedIn &&
                            <SuggestionsMobile subscriptionsUpdate={subscriptionsUpdate} updatePosts={updatePosts}/>}
                        {latestPosts.map(post => {
                            return (
                                <Post key={post.id} post={post} likeDislike={likeDislike}
                                      followUnfollow={followUnfollow}
                                      postDelete={postDelete} allFollowed={allFollowed}/>
                            )
                        })}

                    </Grid>
                    {isLoggedIn &&
                        <Grid item sx={{display: {xs: 'none', md: 'flex'}}}
                              flexDirection='column'>
                            <Suggestions subscriptionsUpdate={subscriptionsUpdate} updatePosts={updatePosts}/>
                            <Subscriptions/>
                        </Grid>}
                </Grid>


            </Container>
        </InfiniteScroll>
    );
}

export default Feed;