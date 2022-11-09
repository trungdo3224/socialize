import { api } from "./apiBaseUrl";

export const createChat = (senderId, recieverId) =>
  api.post("/chat", { senderId, recieverId });
export const userChats = (id) => api.get(`/chat/${id}`);
