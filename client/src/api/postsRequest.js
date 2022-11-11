import { api } from "./apiBaseUrl";


export const uploadImage = (data) => api.post("/upload/", data);
export const uploadPost = (data) => api.post("/posts", data);

export const getTimeLinePosts = (id) => api.get(`/posts/${id}/timeline`);

export const likePost = (id, userId) => api.put(`/posts/${id}/like`, {userId});


export const editPost = (id) => api.put(`/posts/${id}`);
export const deletePost = (id, userId) => api.delete(`/posts/${id}/${userId}`);
// export const deletePost = (id, userId) => 

export const getCommentsByPost = (id) => api.get(`/posts/${id}/comment`)
export const creatComment = (id,data) => api.put(`/posts/${id}/comment`, data);
export const deleteComment = (id, user_id, comment_id) => api.delete(`/posts/${id}/${user_id}/${comment_id}`);