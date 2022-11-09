import * as postApi from "../../api/postsRequest";
import { POST_ACTION_TYPES } from "../types/post.types";

export const uploadImage = (data) => async (dispatch) => {
  try {
    console.log("Image upload Action");
    await postApi.uploadImage(data);
  } catch (error) {
    console.log(error);
    return;
  }
};

export const uploadPost = (data) => async (dispatch) => {
  dispatch({ type: POST_ACTION_TYPES.UPLOAD_START });
  try {
    const newPost = await postApi.uploadPost(data);
    dispatch({ type: POST_ACTION_TYPES.UPLOAD_SUCCESS, data: newPost.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: POST_ACTION_TYPES.UPLOAD_FAIL });
  }
};

export const getTimeLinePosts = (id) => async (dispatch) => {
  // console.log(id);
  dispatch({ type: POST_ACTION_TYPES.RETREIVING_START });
  try {
    const data = await postApi.getTimeLinePosts(id);
    // console.log(data);
    dispatch({ type: POST_ACTION_TYPES.RETREIVING_SUCCESS, data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: POST_ACTION_TYPES.RETREIVING_FAIL });
  }
};

export const deletePost = (id, userId) => async (dispatch) => {
  dispatch({ type: POST_ACTION_TYPES.DELETE_START });
  try {
    await postApi.deletePost(id, userId);
    dispatch({ type: POST_ACTION_TYPES.DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: POST_ACTION_TYPES.DELETE_FAIL });
  }
};

export const commentPost = (postId, userId) => async (dispatch) => {
  dispatch({ type: POST_ACTION_TYPES.COMMENT_START });
  try {
    const postData = await postApi.creatComment(postId, userId);
    dispatch({ type: POST_ACTION_TYPES.COMMENT_SUCCESS, payload: postData.data });
  } catch (error) {
    dispatch({ type: POST_ACTION_TYPES.COMMENT_FAIL });
  }
};
