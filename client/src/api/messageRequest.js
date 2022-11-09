import { api } from "./apiBaseUrl";

export const getMessages = (id) => api.get(`/message/${id}`);
export const addMessage = (data) => api.post(`/message/`, data);