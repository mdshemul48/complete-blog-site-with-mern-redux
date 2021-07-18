import axios from "axios"
import { CREATE_POST, SET_LOADER, CLOSE_LOADER } from '../types/PostTypes'

const token = localStorage.getItem("myToken")
export const createAction = (postData) => {
    return async (dispatch) => {
        try {
            const config = {
                Headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axios.post()
        } catch (error) {

        }
    }
}