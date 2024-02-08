import axios from "axios";

const DOMAIN = process.env.DOMAIN || "127.0.0.1:3000";

export const http = axios.create({
  withCredentials: true,
  baseURL: `http://${DOMAIN}/api`,
});
