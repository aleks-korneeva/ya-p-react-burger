import {api} from "../../utils/api";
import {setUser} from "./auth";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export function register(formData) {
    return function (dispatch) {
        dispatch({
            type: REGISTER_REQUEST
        })

        api.register(formData)
            .then(data => {
                    dispatch(setUser(data.user))
                    dispatch({
                        type: REGISTER_SUCCESS
                    })
                }
            )
            .catch(error => {
                dispatch({
                    type: REGISTER_FAILED,
                    payload: error
                })
            })
    }
}