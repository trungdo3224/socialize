import * as authApi from "../../api/authRequests";
import { AUTH_ACTION_TYPES } from "../types/auth.types";

export const logIn = (formData, navigate) => async (dispatch) => {
  dispatch({ type: AUTH_ACTION_TYPES.AUTH_START });
  try {
    console.log("LOGIN START")
    const { data } = await authApi.logIn(formData);
    dispatch({ type: AUTH_ACTION_TYPES.AUTH_SUCCESS, data: data });
    navigate("../home", { replace: true });
  } catch (error) {
    console.log(error);
    dispatch({ type: AUTH_ACTION_TYPES.AUTH_FAILED });
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  dispatch({ type: AUTH_ACTION_TYPES.AUTH_START });
  try {
    const { data } = await authApi.signUp(formData);
    dispatch({ type: AUTH_ACTION_TYPES.AUTH_SUCCESS, data: data });
    navigate("../home", { replace: true });
  } catch (error) {
    console.log(error);
    dispatch({ type: AUTH_ACTION_TYPES.AUTH_FAILED });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: AUTH_ACTION_TYPES.LOG_OUT });
};
