import jwtDecode from "jwt-decode"

const initState = {
    loading: false,
    registerErrors: [],
    loginError: [],
    token: "",
    user: ""
}

const verifyToken = (token) => {
    const decodedInfo = jwtDecode(token)
    const expiresIn = new Date(decodedInfo.exp * 1000)
    if (new Date() > expiresIn) {
        localStorage.removeItem('myToken')
    }
    else {
        return decodedInfo
    }
}

const token = localStorage.getItem('myToken')
if (token) {
    const decodedInfo = verifyToken(token)
    initState.token = token
    const { user } = decodedInfo
    initState.user = user
}


const AuthReducer = (state = initState, action) => {
    if (action.type === "SET_LOADER") {
        return { ...state, loading: true }
    } else if (action.type === "CLOSE_LOADER") {
        return { ...state, loading: false }

    } else if (action.type === "REGISTER_ERRORS") {
        return { ...state, registerErrors: action.payload }


    } else if (action.type === "SET_TOKEN") {
        return { ...state, token: action.payload }
    } else {
        return state
    }

}
export default AuthReducer