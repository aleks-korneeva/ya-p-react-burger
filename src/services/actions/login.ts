import {api} from "../../utils/api";
import {setUser} from "./auth";
import {AppDispatch} from "../types";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export interface ILoginRequestAction {
    readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
    readonly type: typeof LOGIN_SUCCESS;
}

export interface ILoginFailedAction {
    readonly type: typeof LOGIN_FAILED;
    payload: any;
}

export type TLoginAction =
    ILoginRequestAction
    | ILoginSuccessAction
    | ILoginFailedAction;

export function login(formData: { email: string, password: string }) {
    return function (dispatch: AppDispatch) {
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