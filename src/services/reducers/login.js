import {LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS} from "../actions/login";

const initialState = {
    loginRequest: false,
    loginSuccess: false,
    loginFailed: false,
    error: null,
}

export const loginReducer = (state = initialState, action) => {
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