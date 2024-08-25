import {API_URL} from "./config.js";
import axiosInstance from "./axiosConfig.js";


export const login = (loginData) => {
    return axiosInstance.post(API_URL + 'authentication/login', loginData);
}

export const signUp = (signupData) => {
    return axiosInstance.post(API_URL + 'authentication/signup-user', signupData);
}
