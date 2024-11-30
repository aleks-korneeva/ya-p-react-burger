import {StorageKey} from "./storage-key";
import {TAuthResponse, TResponse, TResponseWithMessage, TUser, TUserWithPassword} from "./types";

const baseUrl = 'https://norma.nomoreparties.space/api/';
const apiEndpointToken = 'auth/token';
const apiEndpointRegister = 'auth/register';
const apiEndpointLogin = 'auth/login';
const apiEndpointLogout = 'auth/logout';
const apiEndpointUser = 'auth/user';
const apiEndpointResetPassword = 'password-reset';
const apiEndpointSetPassword = 'password-reset/reset';

export function requestWithRefreshToken<T extends TResponse>(endpoint: string, options: RequestInit): Promise<T> {
    return request<T>(endpoint, options).catch(error => {
        if (error.message.includes("jwt expired")) {
            return refreshToken().then(() => {
                const updatedOptions = {
                    ...options,
                    headers: {
                        ...options.headers,
                        authorization: localStorage.getItem(StorageKey.ACCESS_TOKEN) || ''
                    }
                }
                return request(endpoint, updatedOptions);
            });
        } else {
            return Promise.reject(error);
        }
    })
}

export const request = <T extends TResponse>(endpoint: string, options?: RequestInit): Promise<T> => {
    const url = `${baseUrl}${endpoint}`;
    return fetch(url, options)
        .then(checkResponse<T>)
        .then(checkSuccess<T>);
}

export const getUser = (): Promise<Pick<TAuthResponse, "success" | "user">> => {
    const requestOptions = {
        method: 'GET',
        headers: {
            authorization: localStorage.getItem(StorageKey.ACCESS_TOKEN) || ''
        }
    }

    return requestWithRefreshToken<Pick<TAuthResponse, "success" | "user">>(apiEndpointUser, requestOptions)
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

export const login = (formData: { email: string, password: string }) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
    }

    return request<TAuthResponse>(apiEndpointLogin, requestOptions)
        .then(data => {
                localStorage.setItem(StorageKey.ACCESS_TOKEN, data.accessToken);
                localStorage.setItem(StorageKey.REFRESH_TOKEN, data.refreshToken);
                return data;
            }
        )
}

export const logout = (): Promise<TResponseWithMessage> => {
    const requestOptions = {
        method: 'POST',
        headers: {
            authorization: localStorage.getItem(StorageKey.ACCESS_TOKEN) || '',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: localStorage.getItem(StorageKey.REFRESH_TOKEN)
        })
    }

    return request<TResponseWithMessage>(apiEndpointLogout, requestOptions)
        .then((data) => {
                localStorage.removeItem(StorageKey.ACCESS_TOKEN);
                localStorage.removeItem(StorageKey.REFRESH_TOKEN);
                return data;
            }
        )
}

export function updateUser(formData: TUserWithPassword): Promise<Pick<TAuthResponse, "success" | "user">> {
    const requestOptions = {
        method: 'PATCH',
        headers: {
            authorization: localStorage.getItem(StorageKey.ACCESS_TOKEN) || '',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
    }

    return requestWithRefreshToken(apiEndpointUser, requestOptions);
}

export function register(formData: TUserWithPassword): Promise<TAuthResponse> {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
    }

    return request<TAuthResponse>(apiEndpointRegister, requestOptions)
        .then((data) => {
            localStorage.setItem(StorageKey.ACCESS_TOKEN, data.accessToken);
            localStorage.setItem(StorageKey.REFRESH_TOKEN, data.refreshToken);
            return data;
        })
}

export function setPassword(formData: {password: string, token: string}): Promise<TResponseWithMessage> {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
    }

    return request<TResponseWithMessage>(apiEndpointSetPassword, requestOptions)
        .then((data) => {
                localStorage.setItem(StorageKey.PASSWORD_RESET, 'false');
                return data;
            }
        )
}

export function resetPassword(formData: Pick<TUser, "email">): Promise<TResponseWithMessage> {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
    }

    return request<TResponseWithMessage>(apiEndpointResetPassword, requestOptions)
        .then((data) => {
                localStorage.setItem(StorageKey.PASSWORD_RESET, 'true');
                localStorage.setItem(StorageKey.REDIRECT_SET_PASSWORD, 'true');
                return data;
            }
        )
}

const checkResponse= <T>(response: Response): Promise<T> => {
    if (response && response.ok) {
        return response.json()
    } else {
        return response.json().then((error) => {
            return Promise.reject(error);
        })
    }
}

const checkSuccess = <T extends TResponse> (response: T): Promise<T> => {
    if (response && response.success) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(`Response is not success ${response}`);
    }
}

function refreshToken(): Promise<Omit<TAuthResponse, "user">> {
    const requestOptions = {
        method: 'POST',
        headers: {
            authorization: localStorage.getItem(StorageKey.ACCESS_TOKEN) || '',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: localStorage.getItem(StorageKey.REFRESH_TOKEN)
        })
    }

    return request<Omit<TAuthResponse, "user">>(apiEndpointToken, requestOptions)
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
