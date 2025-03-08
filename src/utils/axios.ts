import axios from "axios";

export const fetcher = axios.create({
  baseURL: "https://bak-backend-production.up.railway.app/",
  timeout: 1000,
  withCredentials: true,
});
