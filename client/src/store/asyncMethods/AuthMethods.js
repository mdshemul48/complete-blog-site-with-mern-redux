import axios from "axios"

export const postRegister = (formState) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: "SET_LOADER" })
        try {
            const response = await axios.post("/register", formState, config)
            console.log('gg')
            dispatch({ type: "CLOSE_LOADER" })
            console.log(response)

        } catch (err) {
            console.log(err.response)
            dispatch({ type: "REGISTER_ERRORS", payload: err.response.data.errors })
        }
    }

}