import {RESET_PASSWORD_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS} from "../actions/password-reset";

const initialState = {
    resetPasswordRequest: false,
    resetPasswordSuccess: false,
    resetPasswordFailed: false,
    error: null
}

export const passwordResetReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST: {
            return {...state, resetPasswordRequest: true, resetPasswordFailed: false, resetPasswordSuccess: false };
        }
        case RESET_PASSWORD_SUCCESS: {
            return {...state, resetPasswordRequest: false, resetPasswordFailed: false, resetPasswordSuccess: true };
        }
        case RESET_PASSWORD_FAILED: {
            return {...state, resetPasswordRequest: false, resetPasswordFailed: true, resetPasswordSuccess: false, error: action.payload };
        }
        default:
            return state;
    }
}