const initState = {
    loading: false,
    registerErrors: [],
    loginError: []
}

const AuthReducer = (state = initState, action) => {
    if (action.type === "SET_LOADER") {
        return { ...state, loading: true }
    } else if (action.type === "CLOSE_LOADER") {
        return { ...state, loading: false }
    } else {
        return state
    }

}
export default AuthReducer