import {api} from "../../utils/api";
import {setUser} from "./auth";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export function login(formData) {
    return function (dispatch) {
        dispatch({
            type: LOGIN_REQUEST
        })

        api.login(formData)
            .then((data) => {
                    dispatch(setUser(data.user))
                    dispatch({
                        type: LOGIN_SUCCESS
                    })
                }
            )
            .catch((error) => {
                dispatch({
                    type: LOGIN_FAILED,
                    payload: error
                })
            })
    }
}