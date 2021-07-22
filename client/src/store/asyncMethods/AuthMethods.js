import axios from "axios"
import { SET_TOKEN, SET_LOADER, CLOSE_LOADER, REGISTER_ERRORS } from "../types/UserTypes"

export const postRegister = (formState) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: SET_LOADER })
        try {
            const { data } = await axios.post("/register", formState, config)
            dispatch({ type: CLOSE_LOADER })
            localStorage.setItem("myToken", data.token)
            dispatch({ type: SET_TOKEN, payload: data.token })
        } catch (err) {
            dispatch({ type: CLOSE_LOADER })
            dispatch({ type: REGISTER_ERRORS, payload: err.response.data.errors })
        }
    }

}