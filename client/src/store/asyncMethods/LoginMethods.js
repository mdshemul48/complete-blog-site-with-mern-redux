import axios from "axios"
import { SET_TOKEN, SET_LOADER, CLOSE_LOADER, LOGIN_ERRORS } from "../types/UserTypes"



export const postLogin = (loginInfo) => {

    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: SET_LOADER })
        try {
            const { data } = await axios.post("/login", loginInfo, config)
            dispatch({ type: SET_TOKEN, payload: data.token })
            dispatch({ type: CLOSE_LOADER })
            localStorage.setItem("myToken", data.token)
        } catch (err) {
            dispatch({ type: LOGIN_ERRORS, payload: err.response.data.errors })
            console.log(err)
        }
    }
}