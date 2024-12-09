import {
    LOGOUT_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS, TLogoutAction,
} from "../actions/logout";

export type TLogoutState = {
    logoutRequest: boolean;
    logoutSuccess: boolean;
    logoutFailed: boolean;
    error: any;
}

const initialState = {
    logoutRequest: false,
    logoutSuccess: false,
    logoutFailed: false,
    error: null,
}

export const logoutReducer = (state: TLogoutState = initialState, action: TLogoutAction) => {
    switch (action.type) {
        case LOGOUT_REQUEST: {
            return {...state, logoutRequest: true, logoutSuccess: false, logoutFailed: false };
        }
        case LOGOUT_SUCCESS: {
            return {...state, logoutRequest: false, logoutSuccess: true, logoutFailed: false };
        }
        case LOGOUT_FAILED: {
            return {...state, logoutRequest: false, logoutSuccess: false, logoutFailed: true, error: action.payload };
        }
        default:
            return state;
    }
}