import axios from "axios";
import {
  CREATE_ERRORS,
  REMOVE_ERRORS,
  SET_LOADER,
  CLOSE_LOADER,
  REDIRECT_TRUE,
  SET_MESSAGE,
  SET_POSTS,
  SET_POST,
  POST_REQUEST,
  SET_UPDATE_ERRORS,
  UPDATE_IMAGE_ERROR,
  SET_DETAILS,
} from "../types/PostTypes";

export const createAction = (postData) => {
  return async (dispatch, getState) => {
    const {
      AuthReducer: { token },
    } = getState();

    dispatch({ type: SET_LOADER });
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const {
        data: { msg },
      } = await axios.post("/create_post", postData, config);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: REMOVE_ERRORS });
      dispatch({ type: REDIRECT_TRUE });
      dispatch({ type: SET_MESSAGE, payload: msg });
    } catch (error) {
      const { errors } = error.response.data;
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: CREATE_ERRORS, payload: errors });
    }
  };
};

export const fetchPosts = (id, page) => {
  return async (dispatch, getState) => {
    const {
      AuthReducer: { token },
    } = getState();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      dispatch({ type: SET_LOADER });
      const {
        data: { response, count, parPage },
      } = await axios.get(`/posts/${id}/${page}`, config);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_POSTS, payload: { response, count, parPage } });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: CLOSE_LOADER });
    }
  };
};

export const fetchPost = (id) => {
  return async (dispatch, getState) => {
    const {
      AuthReducer: { token },
    } = getState();

    dispatch({ type: SET_LOADER });
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const {
        data: { post },
      } = await axios.get(`/post/${id}`, config);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_POST, payload: post });
      dispatch({ type: POST_REQUEST });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      console.log(error.message);
    }
  };
};

export const updateAction = (editData) => {
  return async (dispatch, getState) => {
    const {
      AuthReducer: { token },
    } = getState();

    dispatch({ type: SET_LOADER });
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put("/update", editData, config);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: REDIRECT_TRUE, payload: data.msg });
    } catch (err) {
      const {
        response: {
          data: { errors },
        },
      } = err;

      dispatch({ type: SET_UPDATE_ERRORS, payload: errors });
      dispatch({ type: CLOSE_LOADER });
    }
  };
};

export const updateImageAction = (updateData) => {
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
      const {
        data: { msg },
      } = await axios.post("/updateImage", updateData, config);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: REDIRECT_TRUE });
      dispatch({ type: SET_MESSAGE, payload: msg });
    } catch (error) {
      const {
        response: {
          data: { errors },
        },
      } = error;
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: UPDATE_IMAGE_ERROR, payload: errors });
    }
  };
};

export const homePosts = (page) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const {
        data: { response, count, parPage },
      } = await axios.get(`/home/${page}`);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_POSTS, payload: { response, count, parPage } });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
    }
  };
};

export const postDetails = (slug) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const {
        data: { post },
      } = await axios.get(`/details/${slug}`);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_DETAILS, payload: post });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      console.log(error);
    }
  };
};
