import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_DB_URL,
  withCredentials: true,
});

export default API;
