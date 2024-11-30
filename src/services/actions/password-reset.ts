import {api} from "../../utils/api";
import {TUser} from "../../utils/types";
import {AppDispatch} from "../types";

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
    payload: any;
}

export type TResetPasswordAction =
    IResetPasswordRequestAction
    | IResetPasswordSuccessAction
    | IResetPasswordFailedAction;

export function resetPassword(formData: Pick<TUser, "email">) {
    return function (dispatch: AppDispatch) {
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