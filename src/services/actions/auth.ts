import {api} from "../../utils/api";
import {StorageKey} from "../../utils/storage-key";
import {TUser} from "../../utils/types";
import {AppDispatch} from "../types";

export const SET_USER = 'SET_USER';
export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';

export interface ISetUserAction {
    readonly type: typeof SET_USER;
    payload: TUser | null;
}

export interface ISetAuthCheckedAction {
    readonly type: typeof SET_AUTH_CHECKED;
    payload: boolean;
}

export type IUserAuthAction = ISetUserAction | ISetAuthCheckedAction;

export function setUser(user: TUser | null): ISetUserAction {
    return {
        type: SET_USER,
        payload: user
    }
}

export function setAuthChecked(checked: boolean): ISetAuthCheckedAction {
    return {
        type: SET_AUTH_CHECKED,
        payload: checked
    }
}

export function getUser() {
    return (dispatch: AppDispatch) => {
        return api.getUser().then((data) => {
            dispatch(setUser(data.user))
        });
    }
}

export function checkUserAuth() {
    return (dispatch: AppDispatch) => {
        if (localStorage.getItem(StorageKey.ACCESS_TOKEN)) {
            dispatch(getUser())
                .catch(() => {
                    dispatch(setUser(null));
                })
                .finally(() => {
                    dispatch(setAuthChecked(true));
                })
        } else {
            dispatch(setAuthChecked(true));
        }
    }
}





