import {API_URL} from "./config.js";
import axiosInstance from "./axiosConfig.js";

export const fetchCurrentUser = () => {
    return axiosInstance.get(API_URL + 'users/fetch-user-profile')
};

export const uploadUserAvatar = async (formData, userId) => {
    return axiosInstance.post(API_URL + 'users/upload-avatar', formData, {
        headers: {
            'Content-Type': "multipart/form-data"
        },
        params: {
            userId
        }
    })
}
