import axios from "axios";
import {API_URL} from "./config.js";


export const login = (loginData) => {
    return axios.post(API_URL + 'authentication/login', loginData);
}
