import { api } from "./apiBaseUrl";

export const userChats = (id) => api.get(`/chat/${id}`);
