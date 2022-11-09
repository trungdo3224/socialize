import { api } from "./apiBaseUrl";

export const getUser = (id) => api.get(`/users/${id}`);
export const getAllUsers= () => api.get("/users")

export const updateUser = (id, formData) => api.put(`/users/${id}`, formData);

export const followUser = (id, data) => api.put(`/users/${id}/follow`, data);

export const unFollowUser = (id, data) => api.put(`/users/${id}/unfollow`, data);