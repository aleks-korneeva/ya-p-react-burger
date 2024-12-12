import {api} from "../../utils/api";
import {AppDispatch} from "../types";

export const SET_PASSWORD_REQUEST = 'SET_PASSWORD_REQUEST';
export const SET_PASSWORD_SUCCESS = 'SET_PASSWORD_SUCCESS';
export const SET_PASSWORD_FAILED = 'SET_PASSWORD_FAILED';

export interface ISetPasswordRequestAction {
    readonly type: typeof SET_PASSWORD_REQUEST;
}

export interface ISetPasswordSuccessAction {
    readonly type: typeof SET_PASSWORD_SUCCESS;
}

export interface ISetPasswordFailedAction {
    readonly type: typeof SET_PASSWORD_FAILED;
    payload: any;
}

export type TSetPasswordAction =
    ISetPasswordRequestAction
    | ISetPasswordSuccessAction
    | ISetPasswordFailedAction;

export function setPassword(formData: {password: string, token: string}) {
    return function (dispatch: AppDispatch) {
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