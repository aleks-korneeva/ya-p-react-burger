import {
    REGISTER_FAILED,
    REGISTER_REQUEST,
    REGISTER_SUCCESS, SET_AUTH_CHECKED, SET_USER,
} from "../actions/auth";

const initialState = {
    loginRequest: false,
    loginSuccess: false,
    loginFailed: false,
    user: null,
    isAuthChecked: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            return {...state, user: action.payload};
        }

        case SET_AUTH_CHECKED: {
            return {...state, isAuthChecked: action.payload}
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

        default:
            return state;
    }
}