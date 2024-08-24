import {AUTH_TOKEN, AUTH_USER, EXPIRATION_DATE} from "./Constants.js";

export const storeAuthDataInLocalStorage = (authData) => {
    const { authToken, expirationTime, user } = authData;
    const date = new Date();
    date.setSeconds(date.getSeconds() + +expirationTime);
    localStorage.setItem(AUTH_TOKEN, authToken);
    localStorage.setItem(EXPIRATION_DATE, date.toISOString());
    localStorage.setItem(AUTH_USER, JSON.stringify(user));
}

export const removeAuthDataFromLocalStorage = () => {
    localStorage.removeItem(AUTH_USER);
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(EXPIRATION_DATE);
}

export const getAuthToken = () => {
    return localStorage.getItem(AUTH_TOKEN);
}

export const getAuthUserData = () => {
    return JSON.parse(localStorage.getItem(AUTH_USER));
}

export const getExpirationTimeInSeconds = () => {
    const expDate = new Date(localStorage.getItem(EXPIRATION_DATE));
    const currentDate = new Date();
    return Math.round((expDate.getTime() - currentDate.getTime()) / 1000);
}
