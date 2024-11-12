import {refreshToken, request, requestWithRefreshToken} from "../../utils/api";
import {deleteCookie, getCookie, setCookie} from "../../utils/cookie";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';


const apiEndpointRegister = 'auth/register';
const apiEndpointLogin = 'auth/login';
const apiEndpointLogout = 'auth/logout';
const apiEndpointUser = 'auth/user';


export function register(formData) {
    return function (dispatch) {
        dispatch({
            type: REGISTER_REQUEST
        })

        console.log(formData)

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(formData)
        }

        request(apiEndpointRegister, requestOptions)
            .then(data => {
                    const accessToken = data.accessToken.split("Bearer ")[1];
                    const refreshToken = data.refreshToken;
                    setCookie("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                    dispatch({
                        type: REGISTER_SUCCESS,
                        user: data.user
                    })
                }
            )
            .catch(error => {
                dispatch({
                    type: REGISTER_FAILED,
                    error: error
                })
            })
    }
}

export function login(formData) {
    return function (dispatch) {
        dispatch({
            type: LOGIN_REQUEST
        })

        console.log(formData)

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(formData)
        }

        request(apiEndpointLogin, requestOptions)
            .then(data => {
                    const accessToken = data.accessToken.split("Bearer ")[1];
                    const refreshToken = data.refreshToken;
                    setCookie("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                    dispatch({
                        type: LOGIN_SUCCESS,
                        user: data.user
                    })
                }
            )
            .catch(error => {
                dispatch({
                    type: LOGIN_FAILED,
                    error: error
                })
            })
    }
}

export function logout() {
    return function (dispatch) {
        dispatch({
            type: LOGOUT_REQUEST
        })

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

        request(apiEndpointLogout, requestOptions)
            .then(() => {
                    deleteCookie("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch({
                        type: LOGOUT_SUCCESS,
                        user: null
                    })
                }
            )
            .catch(error => {
                dispatch({
                    type: LOGOUT_FAILED,
                    error: error
                })
            })
    }
}

export function getUser() {
    return function (dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        })

        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + getCookie("accessToken")
            }
        }

        // refreshToken().then(

        requestWithRefreshToken(apiEndpointUser, requestOptions)
            .then((data) => {
                    dispatch({
                        type: GET_USER_SUCCESS,
                        user: data.user
                    })
                }
            )
            .catch(error => {
                dispatch({
                    type: GET_USER_FAILED,
                    error: error
                })
            })
        // )
    }
}

export function updateUser(formData) {
    return function (dispatch) {
        dispatch({
            type: UPDATE_USER_REQUEST
        })

        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Authorization': "Bearer " + getCookie("accessToken"),
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(formData)
        }

        requestWithRefreshToken(apiEndpointUser, requestOptions)
            .then((data) => {
                    dispatch({
                        type: UPDATE_USER_SUCCESS,
                        user: data.user
                    })
                }
            )
            .catch(error => {
                dispatch({
                    type: UPDATE_USER_FAILED,
                    error: error
                })
            })
    }
}



