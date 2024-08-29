import axiosInstance from "./axiosConfig.js";
import {API_URL} from "./config.js";

export const createGroup = (groupData = '') => {
    return axiosInstance.post(API_URL + 'group/create-group', groupData);
}

export const getGroups = (searchTerm = '') => {
    return axiosInstance.get(API_URL + 'group/get-groups', {
        params: {
            searchTerm
        }
    })
}
