import axios from "axios";
import { CLOSE_LOADER, REDIRECT_TRUE } from "../types/PostTypes";
import { SET_PROFILE_ERRORS, RESET_PROFILE_ERRORS } from "../types/profileType";

export const updateNameAction = (user) => {
  return async (dispatch, getState) => {
    const {
      AuthReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post("/updateName", user, config);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: REDIRECT_TRUE });
      console.log(data);
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_PROFILE_ERRORS,
        payload: error.response.data.errors,
      });
    }
  };
};
