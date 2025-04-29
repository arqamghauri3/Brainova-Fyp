import axios from "axios";
import { refreshToken, logout } from "../store/slices/authSlice";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: { "Content-Type": "application/json" },
});

// ✅ Attach access token from localStorage
axiosInstance.interceptors.request.use(async (config) => {
  const access = localStorage.getItem("access");

  if (access) {
    config.headers["Authorization"] = `Bearer ${access}`;
  }

  return config;
});

// ✅ Handle Token Expiry & Refresh Logic
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const result = await refreshToken(); // ✅ Direct function call instead of dispatch
        const newAccess = result.access;

        if (newAccess) {
          localStorage.setItem("access", newAccess);
          originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
          return axiosInstance(originalRequest);
        }
      } catch (err) {
        logout();
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
