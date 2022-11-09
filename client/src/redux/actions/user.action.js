import { AUTH_ACTION_TYPES } from "../types/auth.types";
import * as userApi from "../../api/userRequests";

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: AUTH_ACTION_TYPES.UPDATING_START });
  try {
    const { data } = await userApi.updateUser(id, formData);
    dispatch({ type: AUTH_ACTION_TYPES.UPDATING_SUCCESS, data });
  } catch (error) {
    dispatch({ type: AUTH_ACTION_TYPES.UPDATING_FAILED });
    // console.log(error)
  }
};

export const followUser = (id, data) => async (dispatch) => {
  dispatch({ type: AUTH_ACTION_TYPES.FOLLOW_USER });
  userApi.followUser(id, data);
};


export const unFollowUser = (id, data) => async (dispatch) => {
  dispatch({ type: AUTH_ACTION_TYPES.UNFOLLOW_USER });
  userApi.followUser(id, data);
};
