import axios from "axios";

export const api = axios.create({ baseURL: process.env.REACT_APP_BASE_API });
// export const api = axios.create({ baseURL: "http://localhost:5000" });
