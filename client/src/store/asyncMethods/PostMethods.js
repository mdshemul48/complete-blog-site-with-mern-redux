import axios from "axios"
import { CREATE_ERRORS, REMOVE_ERRORS, SET_LOADER, CLOSE_LOADER, REDIRECT_FALSE, REDIRECT_TRUE, SET_MESSAGE, SET_POSTS, SET_POST, POST_REQUEST } from '../types/PostTypes'

export const createAction = (postData) => {
    return async (dispatch, getState) => {
        const { AuthReducer: { token } } = getState()

        dispatch({ type: SET_LOADER })
        try {

            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
            const { data: { msg } } = await axios.post("/create_post", postData, config)
            dispatch({ type: CLOSE_LOADER })
            dispatch({ type: REMOVE_ERRORS })
            dispatch({ type: REDIRECT_TRUE })
            dispatch({ type: SET_MESSAGE, payload: msg })
        } catch (error) {
            const { errors } = error.response.data
            dispatch({ type: CLOSE_LOADER })
            dispatch({ type: CREATE_ERRORS, payload: errors })


        }
    }
}

export const fetchPosts = (id, page) => {
    return async (dispatch, getState) => {
        const { AuthReducer: { token } } = getState()
        try {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
            dispatch({ type: SET_LOADER })
            const { data: { response, count, parPage } } = await axios.get(`/posts/${id}/${page}`, config)
            dispatch({ type: CLOSE_LOADER })
            dispatch({ type: SET_POSTS, payload: { response, count, parPage } })

        } catch (error) {
            console.log(error.response);
            dispatch({ type: CLOSE_LOADER })
        }
    }
}


export const fetchPost = (id) => {
    return async (dispatch, getState) => {
        const { AuthReducer: { token } } = getState()

        dispatch({ type: SET_LOADER })
        try {

            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }

            const { data: { post } } = await axios.get(`/post/${id}`, config)
            dispatch({ type: CLOSE_LOADER })
            dispatch({ type: SET_POST, payload: post })
            dispatch({ type: POST_REQUEST })
        } catch (error) {
            dispatch({ type: CLOSE_LOADER })
            console.log(error.message)
        }

    }
}


export const updateAction = (editData) => {
    return async (dispatch, getState) => {
        const { AuthReducer: { token } } = getState()

        dispatch({ type: SET_LOADER })
        try {

            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }

            const { data } = await axios.post("/update", editData, config)
            dispatch({ type: CLOSE_LOADER })


        } catch (err) {
            dispatch({ type: CLOSE_LOADER })
        }
    }
}