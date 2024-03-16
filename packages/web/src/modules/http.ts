import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000,
  withCredentials: true,
});
