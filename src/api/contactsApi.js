import axiosInstance from "./axiosConfig.js";
import {API_URL} from "./config.js";

export const getContacts = (searchTerm) => {
    return axiosInstance.get(API_URL + 'contacts/get-contacts', {
        params: {
            searchTerm
        }
    });
}
