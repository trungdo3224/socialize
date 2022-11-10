import { POST_ACTION_TYPES } from "../types/post.types";

const initialState = {
  posts: null,
  comments: [],
  loading: false,
  error: false,
  uploading: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    // belongs to PostShare.jsx
    // Upload
    case POST_ACTION_TYPES.UPLOAD_START:
      return { ...state, error: false, uploading: true };
    case POST_ACTION_TYPES.UPLOAD_SUCCESS:
      return {
        ...state,
        posts: [action.data, ...state.posts],
        uploading: false,
        error: false,
      };
    case POST_ACTION_TYPES.UPLOAD_FAIL:
      return { ...state, uploading: false, error: true };

    // Delete
    case POST_ACTION_TYPES.DELETE_START:
      return { ...state };
    case POST_ACTION_TYPES.DELETE_SUCCESS:
      return {
        ...state,
        posts: [...state.posts].filter((post) => post._id !== action.payload),
      };
    case POST_ACTION_TYPES.DELETE_FAIL:
      return { ...state, error: true, loading: false };

    // Comment Post
    case POST_ACTION_TYPES.COMMENT_START:
      return { ...state };
    case POST_ACTION_TYPES.COMMENT_SUCCESS:
      const comments = action.payload;
      return {
        ...state,
        comments: [comments[0], ...state.comments],
        loading: false,
        error: false,
      };
    case POST_ACTION_TYPES.COMMENT_FAIL:
      return { ...state, error: true, loading: false };

    case POST_ACTION_TYPES.DELETE_COMMENT:
      return { 
        ...state,
        comments: [...state.comments].filter((comment) => comment._id !== action.payload)
      };
    // Fetch
    case POST_ACTION_TYPES.RETREIVING_START:
      return { ...state, loading: true, error: false };
    case POST_ACTION_TYPES.RETREIVING_SUCCESS:
      const { data } = action.data;
      return { ...state, posts: data, comments:data.comments, loading: false, error: false };
    case POST_ACTION_TYPES.RETREIVING_FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default postReducer;
