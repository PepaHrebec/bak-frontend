import axios from "axios";

console.log(import.meta.env.VITE_BACKEND);

export const fetcher = axios.create({
  baseURL: import.meta.env.VITE_BACKEND,
  timeout: 1000,
  withCredentials: true,
});
