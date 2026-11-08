import { passwordResetReducer, initialState } from "../../../services/reducers/password-reset";
import {
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS
} from "../../../services/actions/password-reset";

describe('passwordResetReducer test', () => {
    it('should return initial state', () => {
        expect(passwordResetReducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should handle RESET_PASSWORD_REQUEST', () => {
        const action = {
            type: RESET_PASSWORD_REQUEST
        };

        const expectedState = {
            ...initialState,
            resetPasswordRequest: true,
        };

        expect(passwordResetReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle RESET_PASSWORD_SUCCESS', () => {
        const action = {
            type: RESET_PASSWORD_SUCCESS
        };

        const expectedState = {
            ...initialState,
            resetPasswordSuccess: true
        };

        expect(passwordResetReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle RESET_PASSWORD_FAILED', () => {
        const error = 'Error message';
        const action = {
            type: RESET_PASSWORD_FAILED,
            payload: error
        };

        const expectedState = {
            ...initialState,
            resetPasswordFailed: true,
            error: error
        };

        expect(passwordResetReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle state change from success to request', () => {
        const successState = {
            ...initialState,
            resetPasswordSuccess: true
        };

        const action = {
            type: RESET_PASSWORD_REQUEST
        };

        const expectedState = {
            ...initialState,
            resetPasswordRequest: true
        };

        expect(passwordResetReducer(successState, action)).toEqual(expectedState);
    });
});
