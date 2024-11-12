import {getCookie, setCookie} from "./cookie";

const baseUrl = 'https://norma.nomoreparties.space/api/';
const apiEndpointToken = 'auth/token';

export function requestWithRefreshToken(endpoint, options) {
    return request(endpoint, options).catch(error => {
        console.log('error getUser', error)
        if (error.message.includes("jwt expired")) {
            console.error(error.message);
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
