import {SET_PASSWORD_FAILED, SET_PASSWORD_REQUEST, SET_PASSWORD_SUCCESS} from "../actions/set-password";

const initialState = {
    setPasswordRequest: false,
    setPasswordSuccess: false,
    setPasswordFailed: false,
    error: null
}

export const setPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PASSWORD_REQUEST: {
            return {...state, setPasswordRequest: true, setPasswordFailed: false, setPasswordSuccess: false};
        }
        case SET_PASSWORD_SUCCESS: {
            return {...state, setPasswordRequest: false, setPasswordFailed: false, setPasswordSuccess: true };
        }
        case SET_PASSWORD_FAILED: {
            return {...state, setPasswordRequest: false, setPasswordFailed: true, setPasswordSuccess: false, error: action.payload };
        }
        default:
            return state;
    }
}