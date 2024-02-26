import axios from "axios";

const API_URL = process.env.API_URL || "http://127.0.0.1:5000";

export const http = axios.create({
  baseURL: API_URL,
});
