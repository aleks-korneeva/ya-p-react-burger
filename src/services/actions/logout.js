import {api} from "../../utils/api";
import {setUser} from "./auth";
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export function logout() {
    return function (dispatch) {
        dispatch({
            type: LOGOUT_REQUEST
        })

        api.logout()
            .then(() => {
                    dispatch(setUser(null))
                    dispatch({
                        type: LOGOUT_SUCCESS
                    })
                }
            )
            .catch(error => {
                dispatch({
                    type: LOGOUT_FAILED,
                    payload: error
                })
            })
    }
}