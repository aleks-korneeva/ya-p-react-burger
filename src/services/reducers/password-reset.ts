import {
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    TResetPasswordAction
} from "../actions/password-reset";

export type TResetPasswordState = {
    resetPasswordRequest: boolean,
    resetPasswordSuccess: boolean,
    resetPasswordFailed: boolean,
    error: any
}

export const initialState: TResetPasswordState = {
    resetPasswordRequest: false,
    resetPasswordSuccess: false,
    resetPasswordFailed: false,
    error: null
}

export const passwordResetReducer = (state: TResetPasswordState = initialState, action: TResetPasswordAction) => {
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