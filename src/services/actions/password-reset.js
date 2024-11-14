import {request} from "../../utils/api";
import {StorageKey} from "../../utils/storage-key";

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

const apiEndpoint = 'password-reset';

export function resetPassword(email) {
    return function (dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        })

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                email: email
            })
        }

        request(apiEndpoint, requestOptions)
            .then(() => {
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS
                    })
                    localStorage.setItem(StorageKey.PASSWORD_RESET, 'true');
                }
            )
            .catch(error => {
                dispatch({
                    type: RESET_PASSWORD_FAILED,
                    error: error
                })
            })
    }
}