import axios from "axios";
import {
  CLOSE_LOADER,
  REDIRECT_TRUE,
  SET_LOADER,
  SET_MESSAGE,
} from "../types/PostTypes";
import { SET_TOKEN } from "../types/UserTypes";
import { SET_PROFILE_ERRORS, RESET_PROFILE_ERRORS } from "../types/ProfileType";

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
      localStorage.setItem("myToken", data.token);
      dispatch({ type: SET_TOKEN, payload: data.token });
      dispatch({ type: SET_MESSAGE, payload: data.msg });
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

export const updatePasswordMethods = (userData) => {
  return async (dispatch, getState) => {
    const {
      AuthReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    dispatch({ type: SET_LOADER });
    try {
      const { data } = await axios.post("/updatePassword", userData, config);
    } catch (error) {
      dispatch({
        type: SET_PROFILE_ERRORS,
        payload: error.response.data.errors,
      });
      dispatch({ type: CLOSE_LOADER });
    }
  };
};
