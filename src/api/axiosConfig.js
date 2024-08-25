import axios from "axios";
import {getAuthToken} from "../utils/authHelper.js";
import {API_URL} from "./config.js";

// create axios instance
const axiosInstance = axios.create({
    baseURL: API_URL
});

// intercept axios instance and add token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;

