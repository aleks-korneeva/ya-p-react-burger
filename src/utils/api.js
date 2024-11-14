import {StorageKey} from "./storage-key";

const baseUrl = 'https://norma.nomoreparties.space/api/';
const apiEndpointToken = 'auth/token';
const apiEndpointRegister = 'auth/register';
const apiEndpointLogin = 'auth/login';
const apiEndpointLogout = 'auth/logout';
const apiEndpointUser = 'auth/user';
const apiEndpointResetPassword = 'password-reset';
const apiEndpointSetPassword = 'password-reset/reset';

export function requestWithRefreshToken(endpoint, options) {
    return request(endpoint, options).catch(error => {
        if (error.message.includes("jwt expired")) {
            return refreshToken().then(() => {
                options.headers.authorization = localStorage.getItem(StorageKey.ACCESS_TOKEN)
                return request(endpoint, options);
            });
        } else {
            return Promise.reject(error);
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
            authorization: localStorage.getItem(StorageKey.ACCESS_TOKEN)
        }
    }

    return requestWithRefreshToken("auth/user", requestOptions)
        .then((data) => {
                return data;
            }
        )
        .catch((error) => {
            localStorage.removeItem(StorageKey.ACCESS_TOKEN);
            localStorage.removeItem(StorageKey.REFRESH_TOKEN);
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
                localStorage.setItem(StorageKey.ACCESS_TOKEN, data.accessToken);
                localStorage.setItem(StorageKey.REFRESH_TOKEN, data.refreshToken);
                return data;
            }
        )
}

export const logout = () => {
    const requestOptions = {
        method: 'POST',
        headers: {
            authorization: localStorage.getItem(StorageKey.ACCESS_TOKEN),
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: localStorage.getItem(StorageKey.REFRESH_TOKEN)
        })
    }

    return request(apiEndpointLogout, requestOptions)
        .then((data) => {
                localStorage.removeItem(StorageKey.ACCESS_TOKEN);
                localStorage.removeItem(StorageKey.REFRESH_TOKEN);
                return data;
            }
        )
}

export function updateUser(formData) {
    const requestOptions = {
        method: 'PATCH',
        headers: {
            authorization: localStorage.getItem(StorageKey.ACCESS_TOKEN),
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
    }

    return requestWithRefreshToken(apiEndpointUser, requestOptions);
}

export function register(formData) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
    }

    return request(apiEndpointRegister, requestOptions)
        .then((data) => {
            localStorage.setItem(StorageKey.ACCESS_TOKEN, data.accessToken);
            localStorage.setItem(StorageKey.REFRESH_TOKEN, data.refreshToken);
            return data;
        })
}

export function setPassword(formData) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
    }

    return request(apiEndpointSetPassword, requestOptions)
        .then((data) => {
                localStorage.setItem(StorageKey.PASSWORD_RESET, 'false');
                return data;
            }
        )
}

export function resetPassword(formData) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
    }

    return request(apiEndpointResetPassword, requestOptions)
        .then((data) => {
                localStorage.setItem(StorageKey.PASSWORD_RESET, 'true');
                localStorage.setItem(StorageKey.REDIRECT_SET_PASSWORD, 'true');
                return data;
            }
        )
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
            authorization: localStorage.getItem(StorageKey.ACCESS_TOKEN),
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: localStorage.getItem(StorageKey.REFRESH_TOKEN)
        })
    }

    return request(apiEndpointToken, requestOptions)
        .then((data) => {
                localStorage.setItem(StorageKey.ACCESS_TOKEN, data.accessToken)
                localStorage.setItem(StorageKey.REFRESH_TOKEN, data.refreshToken);
                return data;
            }
        ).catch(error => {
            return Promise.reject(error);
        })
}

export const api = {
    getUser, login, logout, updateUser, register, resetPassword, setPassword
}
