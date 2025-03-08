import axios from "axios";

export const fetcher = axios.create({
  baseURL: "https://bak-backend-production.up.railway.app/",
  timeout: 5000,
  withCredentials: true,
});
