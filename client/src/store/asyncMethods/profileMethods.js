import axios from "axios";

export const updateNameAction = (req, res) => {
  return (dispatch, getState) => {
    const {
      AuthReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
    } catch (error) {}
  };
};
