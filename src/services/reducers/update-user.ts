import {TUpdateUserAction, UPDATE_USER_FAILED, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS} from "../actions/update-user";

export type TUpdateUserState = {
    updateUserRequest: boolean,
    updateUserSuccess: boolean,
    updateUserFailed: boolean,
    error: any,
}

export const initialState: TUpdateUserState = {
    updateUserRequest: false,
    updateUserSuccess: false,
    updateUserFailed: false,
    error: null,
}

export const updateUserReducer = (state: TUpdateUserState = initialState, action: TUpdateUserAction) => {
    switch (action.type) {
        case UPDATE_USER_REQUEST: {
            return {...state, updateUserRequest: true, updateUserSuccess: false, updateUserFailed: false };
        }
        case UPDATE_USER_SUCCESS: {
            return {...state, updateUserRequest: false, updateUserSuccess: true, updateUserFailed: false };
        }
        case UPDATE_USER_FAILED: {
            return {...state, updateUserRequest: false, updateUserSuccess: false, updateUserFailed: true, error: action.payload };
        }
        default:
            return state;
    }
}