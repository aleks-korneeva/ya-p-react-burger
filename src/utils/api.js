import {deleteCookie, getCookie, setCookie} from "./cookie";

const baseUrl = 'https://norma.nomoreparties.space/api/';
const apiEndpointToken = 'auth/token';
const apiEndpointRegister = 'auth/register';
const apiEndpointLogin = 'auth/login';
const apiEndpointLogout = 'auth/logout';
const apiEndpointUser = 'auth/user';

export function requestWithRefreshToken(endpoint, options) {
    return request(endpoint, options).catch(error => {
        console.log('error getUser', error)
        if (error.message.includes("jwt expired")) {
            return refreshToken().then(() => {
                const newOptions = {
                    ...options,
                    headers: {
                        ...options.headers,
                        'Authorization': "Bearer " + getCookie("accessToken")
                    }
                };
                return request(endpoint, newOptions);
            });
        }
    })
}

export const request = (endpoint, options) => {
    const url = `${baseUrl}${endpoint}`;
    return fetch(url, options)
        .then(checkResponse)
        .then(checkSuccess);
}

export const getUser = () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + getCookie("accessToken")
        }
    }

    return requestWithRefreshToken("auth/user", requestOptions)
        .then((data) => {
                return data;
            }
        )
        .catch((error) => {
            deleteCookie("accessToken")
            localStorage.removeItem("refreshToken");
            throw error;
        })
}

export const login = (formData) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
    }

    return request(apiEndpointLogin, requestOptions)
        .then(data => {
                const accessToken = data.accessToken.split("Bearer ")[1];
                const refreshToken = data.refreshToken;
                setCookie("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
            }
        )
}

export const logout = () => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': "Bearer " + getCookie("accessToken"),
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken")
        })
    }

    return request(apiEndpointLogout, requestOptions)
        .then(() => {
                deleteCookie("accessToken");
                localStorage.removeItem("refreshToken");
                console.log("cookies dleeted'")
            }
        )
}

export function updateUser(formData) {
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Authorization': "Bearer " + getCookie("accessToken"),
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(formData)
        }

        return requestWithRefreshToken(apiEndpointUser, requestOptions);
    }

const checkResponse = (response) => {
    if (response && response.ok) {
        return response.json()
    } else {
        return response.json().then((error) => {
            return Promise.reject(error);
        })
    }
}

const checkSuccess = (response) => {
    if (response && response.success) {
        return response;
    } else {
        return Promise.reject(`Response is not success ${response}`);
    }
}

export async function refreshToken() {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': "Bearer " + getCookie("accessToken"),
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    }

    return request(apiEndpointToken, requestOptions)
        .then((data) => {
                const accessToken = data.accessToken.split("Bearer ")[1];
                setCookie("accessToken", accessToken)
                localStorage.setItem("refreshToken", data.refreshToken);
                return data;
            }
        ).catch(error => {
            return Promise.reject(error);
        })
}

export const api = {
    getUser, login, logout, updateUser
}
