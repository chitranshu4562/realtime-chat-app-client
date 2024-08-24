import axios from "axios";
import {API_URL} from "./config.js";


export const login = (loginData) => {
    return axios.post(API_URL + 'authentication/login', loginData);
}

export const signUp = (signupData) => {
    return axios.post(API_URL + 'authentication/signup-user', signupData);
}
