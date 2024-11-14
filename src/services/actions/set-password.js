import {request} from "../../utils/api";
import {StorageKey} from "../../utils/storage-key";

export const SET_PASSWORD_REQUEST = 'SET_PASSWORD_REQUEST';
export const SET_PASSWORD_SUCCESS = 'SET_PASSWORD_SUCCESS';
export const SET_PASSWORD_FAILED = 'SET_PASSWORD_FAILED';

const apiEndpoint = 'password-reset/reset';

export function setPassword(formData) {
    return function (dispatch) {
        dispatch({
            type: SET_PASSWORD_REQUEST
        })

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(formData)
        }

        request(apiEndpoint, requestOptions)
            .then(() => {
                    dispatch({
                        type: SET_PASSWORD_SUCCESS
                    });
                    localStorage.setItem(StorageKey.PASSWORD_RESET, 'false');
                }
            )
            .catch(error => {
                dispatch({
                    type: SET_PASSWORD_FAILED,
                    error: error
                })
            })
    }
}