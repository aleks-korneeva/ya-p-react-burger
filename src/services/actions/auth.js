import {api} from "../../utils/api";
import {StorageKey} from "../../utils/storage-key";

export const SET_USER = 'SET_USER';
export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';

export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
}

export function setAuthChecked(checked) {
    return {
        type: SET_AUTH_CHECKED,
        payload: checked
    }
}

export function getUser() {
    return dispatch => {
        return api.getUser().then((data) => {
            dispatch(setUser(data.user))
        });
    }
}

export function checkUserAuth() {
    return dispatch => {
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





