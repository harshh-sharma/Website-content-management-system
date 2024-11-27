import axios from "axios";

// https://website-content-management-system.onrender.com

const BASE_URL = "https://website-content-management-system.onrender.com/api/v1";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;