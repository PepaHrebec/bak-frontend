import axios from "axios";

//https://bak-backend-production.up.railway.app/
//http://localhost:3000
export const fetcher = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  withCredentials: true,
});
