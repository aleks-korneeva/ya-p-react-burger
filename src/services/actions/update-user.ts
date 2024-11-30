import {api} from "../../utils/api";
import {setUser} from "./auth";
import {TUserWithPassword} from "../../utils/types";
import {AppDispatch} from "../types";

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export interface IUpdateUserRequestAction {
    readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccessAction {
    readonly type: typeof UPDATE_USER_SUCCESS;
}

export interface IUpdateUserFailedAction {
    readonly type: typeof UPDATE_USER_FAILED;
    payload: any;
}

export type TUpdateUserAction =
    IUpdateUserRequestAction
    | IUpdateUserSuccessAction
    | IUpdateUserFailedAction;

export function updateUser(formData: TUserWithPassword) {
    return function (dispatch: AppDispatch) {
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