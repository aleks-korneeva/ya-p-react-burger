import {api} from "../../utils/api";
import {setUser} from "./auth";
import {TUserWithPassword} from "../../utils/types";
import {AppDispatch} from "../types";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export interface IRegisterRequestAction {
    readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccessAction {
    readonly type: typeof REGISTER_SUCCESS;
}

export interface IRegisterFailedAction {
    readonly type: typeof REGISTER_FAILED;
    payload: any;
}

export type TRegisterAction =
    IRegisterRequestAction
    | IRegisterSuccessAction
    | IRegisterFailedAction;

export function register(formData: TUserWithPassword) {
    return function (dispatch: AppDispatch) {
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