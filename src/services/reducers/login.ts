import {LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, TLoginAction} from "../actions/login";

export type TLoginState = {
    loginRequest: boolean;
    loginSuccess: boolean;
    loginFailed: boolean;
    error: any;
}

const initialState: TLoginState = {
    loginRequest: false,
    loginSuccess: false,
    loginFailed: false,
    error: null,
}

export const loginReducer = (state: TLoginState = initialState, action: TLoginAction) => {
    switch (action.type) {
        case LOGIN_REQUEST: {
            return {...state, loginRequest: true, loginSuccess: false, loginFailed: false };
        }
        case LOGIN_SUCCESS: {
            return {...state, loginRequest: false, loginSuccess: true, loginFailed: false };
        }
        case LOGIN_FAILED: {
            return {...state, loginRequest: false, loginSuccess: false, loginFailed: true, error: action.payload };
        }
        default:
            return state;
    }
}