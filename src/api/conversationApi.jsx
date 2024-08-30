import axiosInstance from "./axiosConfig.js";
import {API_URL} from "./config.js";

export const createConversation = (data) => {
    return axiosInstance.post(API_URL + 'conversation/create-conversation', data);
}

export const getConversation = (id) => {
    return axiosInstance.get(API_URL + 'conversation/get-conversation', {
        params: {
            conversationId: id
        }
    })
}
