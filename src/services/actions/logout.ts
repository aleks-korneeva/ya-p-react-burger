import {api} from "../../utils/api";
import {setUser} from "./auth";
import {AppDispatch} from "../types";
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export interface ILogoutRequestAction {
    readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailedAction {
    readonly type: typeof LOGOUT_FAILED;
    payload: any;
}

export type TLogoutAction =
    ILogoutRequestAction
    | ILogoutSuccessAction
    | ILogoutFailedAction;

export function logout() {
    return function (dispatch: AppDispatch) {
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