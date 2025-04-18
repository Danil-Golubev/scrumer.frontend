import axios from "axios";
const instance = axios.create({
  baseURL: "https://scrumer-backend.onrender.com",
});

//  baseURL: "http://localhost:4444"
//  baseURL: "https://scrumer-backend.onrender.com",

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
