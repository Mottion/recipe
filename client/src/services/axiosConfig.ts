import axios from "axios";
export const baseUrl = "http://192.168.18.31:3001";

const api = axios.create({
  baseURL: baseUrl,
});

export default api;
