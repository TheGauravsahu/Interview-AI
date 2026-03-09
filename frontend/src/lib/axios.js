import axios from "axios";
import toast from "react-hot-toast";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_API_URL}/api`,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const backendMessage =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.message ||
      "Something went wrong";

    toast.error(backendMessage);

    return Promise.reject(error.response?.data || error);
  },
);
