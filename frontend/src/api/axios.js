import axios from "axios";

const api = axios.create({
  baseURL: "https://codeb-internal-management-system.onrender.com/api",
});

api.interceptors.request.use((config) => {
  console.log("TOKEN:", localStorage.getItem("token"));
  console.log("HEADERS BEFORE:", config.headers);

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("HEADERS AFTER:", config.headers);

  return config;
});

export default api;
