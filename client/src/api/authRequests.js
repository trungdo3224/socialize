import { api } from "./apiBaseUrl";


export const logIn = (formData) => api.post("/auth/login", formData);
export const signUp = (formData) => api.post("/auth/register", formData);

