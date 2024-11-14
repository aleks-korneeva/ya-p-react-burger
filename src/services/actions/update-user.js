import {api} from "../../utils/api";
import {setUser} from "./auth";

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export function updateUser(formData) {
    return function (dispatch) {
        dispatch({
            type: UPDATE_USER_REQUEST
        })

        api.updateUser(formData)
            .then((data) => {
                    dispatch(setUser(data.user));
                    dispatch({
                        type: UPDATE_USER_SUCCESS,
                    })
                }
            )
            .catch(error => {
                dispatch({
                    type: UPDATE_USER_FAILED,
                    payload: error
                })
            })
    }
}