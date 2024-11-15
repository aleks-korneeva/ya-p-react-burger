import {api} from "../../utils/api";

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export function resetPassword(formData) {
    return function (dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        })

        api.resetPassword(formData)
            .then(() => {
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS
                    })
                }
            )
            .catch(error => {
                dispatch({
                    type: RESET_PASSWORD_FAILED,
                    payload: error
                })
            })
    }
}