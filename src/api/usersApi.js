import {API_URL} from "./config.js";
import axiosInstance from "./axiosConfig.js";

export const fetchCurrentUser = () => {
    return axiosInstance.get(API_URL + 'users/fetch-user-profile')
};

export const uploadUserAvatar = (formData, userId) => {
    return axiosInstance.post(API_URL + 'users/upload-avatar', formData, {
        headers: {
            'Content-Type': "multipart/form-data"
        },
        params: {
            userId
        }
    })
}

export const getUsers = (searchTerm = '', userId = '') => {
    return axiosInstance.get(API_URL + 'users/get-users', {
        params: {
            searchTerm, userId
        }
    })
}
