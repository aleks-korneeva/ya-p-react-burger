import {api, request, requestWithRefreshToken} from "../../utils/api";
import {StorageKey} from "../../utils/storage-key";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const SET_USER = 'SET_USER';
export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';

const apiEndpointRegister = 'auth/register';
const apiEndpointUser = 'auth/user';

export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
}

export function setAuthChecked(checked) {
    return {
        type: SET_AUTH_CHECKED,
        payload: checked
    }
}

export function getUser() {
    return dispatch => {
        return api.getUser().then((data) => {
            dispatch(setUser(data.user))
        });
    }
}

export function checkUserAuth() {
    return dispatch => {
        if (localStorage.getItem(StorageKey.ACCESS_TOKEN)) {
            dispatch(getUser())
                .catch(() => {
                    dispatch(setUser(null));
                })
                .finally(() => {
                    dispatch(setAuthChecked(true));
                })
        } else {
            dispatch(setAuthChecked(true));
        }
    }
}

export function register(formData) {
    return function (dispatch) {
        dispatch({
            type: REGISTER_REQUEST
        })

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(formData)
        }

        request(apiEndpointRegister, requestOptions)
            .then(data => {
                    localStorage.setItem(StorageKey.ACCESS_TOKEN, data.accessToken);
                    localStorage.setItem(StorageKey.REFRESH_TOKEN, data.refreshToken);
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

export function updateUser(formData) {
    return function (dispatch) {
        dispatch({
            type: UPDATE_USER_REQUEST
        })

        const requestOptions = {
            method: 'PATCH',
            headers: {
                authorization: localStorage.getItem(StorageKey.ACCESS_TOKEN),
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



