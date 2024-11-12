import {RESET_PASSWORD_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS} from "../actions/password-reset";

const initialState = {
    setPasswordRequest: false,
    setPasswordSuccess: false,
    setPasswordFailed: false,
}

export const setPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST: {
            return {...state, setPasswordRequest: true };
        }
        case RESET_PASSWORD_SUCCESS: {
            return {...state, setPasswordRequest: false, setPasswordFailed: false, setPasswordSuccess: true };
        }
        case RESET_PASSWORD_FAILED: {
            return {...state, setPasswordRequest: false, setPasswordFailed: true, setPasswordSuccess: false };
        }
        default:
            return state;
    }
}