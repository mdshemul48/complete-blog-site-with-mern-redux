import axios from "axios"
import { CREATE_ERRORS, SET_LOADER, CLOSE_LOADER, REDIRECT_FALSE, REDIRECT_TRUE, SET_MESSAGE } from '../types/PostTypes'

const token = localStorage.getItem("myToken")
export const createAction = (postData) => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADER })
        try {

            const config = {
                Headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const { data: { msg } } = await axios.post("/create_post", postData, config)
            dispatch({ type: CLOSE_LOADER })
            dispatch({ type: REDIRECT_TRUE })
            dispatch({ type: SET_MESSAGE, payload: msg })
        } catch (error) {
            const { errors } = error.response.data
            dispatch({ type: CLOSE_LOADER })
            dispatch({ type: CREATE_ERRORS, payload: errors })


        }
    }
}