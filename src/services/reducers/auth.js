import {
    GET_USER_FAILED,
    GET_USER_REQUEST, GET_USER_SUCCESS,
    LOGIN_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS, LOGOUT_FAILED, LOGOUT_REQUEST, LOGOUT_SUCCESS,
    REGISTER_FAILED,
    REGISTER_REQUEST,
    REGISTER_SUCCESS, UPDATE_USER_FAILED, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS
} from "../actions/auth";

const initialState = {
    loginRequest: false,
    loginSuccess: false,
    loginFailed: false,
    user: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST: {
            return {...state, loginRequest: true, loginSuccess: false, loginFailed: false };
        }
        case LOGIN_SUCCESS: {
            return {...state, loginRequest: false, loginFailed: false, loginSuccess: true, user: action.user };
        }
        case LOGIN_FAILED: {
            return {...state, loginRequest: false, loginFailed: true, loginSuccess: false };
        }

        case LOGOUT_REQUEST: {
            return {...state, loginRequest: true, loginSuccess: false, loginFailed: false };
        }
        case LOGOUT_SUCCESS: {
            return {...state, loginRequest: false, loginFailed: false, loginSuccess: true, user: action.user };
        }
        case LOGOUT_FAILED: {
            return {...state, loginRequest: false, loginFailed: true, loginSuccess: false};
        }

        case REGISTER_REQUEST: {
            return {...state, loginRequest: true, loginSuccess: false, loginFailed: false };
        }
        case REGISTER_SUCCESS: {
            return {...state, loginRequest: false, loginFailed: false, loginSuccess: true, user: action.user };
        }
        case REGISTER_FAILED: {
            return {...state, loginRequest: false, loginFailed: true, loginSuccess: false };
        }
        case GET_USER_REQUEST: {
            return {...state, loginRequest: true, loginSuccess: false, loginFailed: false };
        }
        case GET_USER_SUCCESS: {
            return {...state, loginRequest: false, loginFailed: false, loginSuccess: true, user: action.user };
        }
        case GET_USER_FAILED: {
            return {...state, loginRequest: false, loginFailed: true, loginSuccess: false };
        }

        case UPDATE_USER_REQUEST: {
            return {...state, loginRequest: true, loginSuccess: false, loginFailed: false };
        }
        case UPDATE_USER_SUCCESS: {
            return {...state, loginRequest: false, loginFailed: false, loginSuccess: true, user: action.user };
        }
        case UPDATE_USER_FAILED: {
            return {...state, loginRequest: false, loginFailed: true, loginSuccess: false };
        }
        default:
            return state;
    }
}