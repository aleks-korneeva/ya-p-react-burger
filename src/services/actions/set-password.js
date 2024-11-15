import {api} from "../../utils/api";

export const SET_PASSWORD_REQUEST = 'SET_PASSWORD_REQUEST';
export const SET_PASSWORD_SUCCESS = 'SET_PASSWORD_SUCCESS';
export const SET_PASSWORD_FAILED = 'SET_PASSWORD_FAILED';

export function setPassword(formData) {
    return function (dispatch) {
        dispatch({
            type: SET_PASSWORD_REQUEST
        })

        api.setPassword(formData)
            .then(() => {
                    dispatch({
                        type: SET_PASSWORD_SUCCESS
                    });
                }
            )
            .catch(error => {
                dispatch({
                    type: SET_PASSWORD_FAILED,
                    payload: error
                })
            })
    }
}