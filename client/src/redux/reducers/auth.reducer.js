import { AUTH_ACTION_TYPES } from "../types/auth.types";

const initialState = {
  authData: null,
  loading: false,
  error: false,
  updateLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.AUTH_START:
      return { ...state, loading: true, error: false };
    case AUTH_ACTION_TYPES.AUTH_SUCCESS:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, error: false };

    case AUTH_ACTION_TYPES.AUTH_FAILED:
    return { ...state, loading: false, error: true };

    case AUTH_ACTION_TYPES.UPDATING_START:
      return { ...state, updateLoading: true, error: false };
      
    case AUTH_ACTION_TYPES.UPDATING_SUCCESS:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        authData: action.data,
        updateLoading: false,
        error: false,
      };

    case AUTH_ACTION_TYPES.UPDATING_FAILED:
      return { ...state, updateLoading: true, error: true };

    case AUTH_ACTION_TYPES.LOG_OUT:
      localStorage.clear();
      return {
        ...state,
        authData: null,
        loading: false,
        error: false,
        updateLoading: false,
      };

    case AUTH_ACTION_TYPES.FOLLOW_USER:
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [...state.authData.user.following, action.data],
          },
        },
      };

    case AUTH_ACTION_TYPES.UNFOLLOW_USER:
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [
              ...state.authData.user.following.filter(
                (personId) => personId !== action.data
              ),
            ],
          },
        },
      };


    default:
      return state;
  }
};

export default authReducer;
