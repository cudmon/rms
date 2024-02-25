import axios from "axios";

const DOMAIN = process.env.DOMAIN || "http://127.0.0.1:5000";

export const http = axios.create({
  withCredentials: true,
  baseURL: DOMAIN,
});
