import axios from "axios";

const BASE_URL = "https://akademia108.pl/api/social-app"

function axiosConfig() {
    if (localStorage.jwt_token) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.jwt_token,
            }
        }
    } else {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }
    }
}

export const logInApiCall = async (formData) => {
    return await axios.post(BASE_URL + '/user/login', formData, axiosConfig())
}

export const signup = async (formData) => {
    return await axios.post(BASE_URL + '/user/signup', formData, axiosConfig())
}

export const getLatestPosts = async () => {
    return await axios.post(BASE_URL + '/post/latest', '', axiosConfig())

}
export const getAllFollowsApiCall = async () => {
    return await axios.post(BASE_URL + '/follows/allfollows', '', axiosConfig())
}

export const addPostApiCall = async (formData) => {
    return await axios.post(BASE_URL + '/post/add', formData, axiosConfig())
}
export const deletePostApiCall = async (postID) => {
    return await axios.post(BASE_URL + '/post/delete', postID, axiosConfig())
}
export const likeDislikeApiCall = async (postID, isLikedByUser) => {
    return await axios.post(BASE_URL + (isLikedByUser ? '/post/dislike' : '/post/like'), postID, axiosConfig())
}
export const getRecommendationsApiCall = async () => {
    return await axios.post(BASE_URL + '/follows/recommendations', '', axiosConfig())
}
export const followUnfollowUserApiCall = async (userID, isFollowed) => {
    return await axios.post(BASE_URL + (isFollowed ? '/follows/disfollow' : '/follows/follow'), userID, axiosConfig())
}
export const getOlderPostsApiCall = async (lastPostDate) => {
    return await axios.post(BASE_URL + '/post/older-then', lastPostDate, axiosConfig())
}