import { setPasswordReducer, initialState } from "../../../services/reducers/set-password";
import {
    SET_PASSWORD_FAILED,
    SET_PASSWORD_REQUEST,
    SET_PASSWORD_SUCCESS
} from "../../../services/actions/set-password";

describe('setPasswordReducer test', () => {
    it('should return initial state', () => {
        expect(setPasswordReducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should handle SET_PASSWORD_REQUEST', () => {
        const action = {
            type: SET_PASSWORD_REQUEST
        };

        const expectedState = {
            ...initialState,
            setPasswordRequest: true,
            setPasswordFailed: false,
            setPasswordSuccess: false
        };

        expect(setPasswordReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_PASSWORD_SUCCESS', () => {
        const action = {
            type: SET_PASSWORD_SUCCESS
        };

        const expectedState = {
            ...initialState,
            setPasswordRequest: false,
            setPasswordFailed: false,
            setPasswordSuccess: true
        };

        expect(setPasswordReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_PASSWORD_FAILED', () => {
        const error = 'Password set error';
        const action = {
            type: SET_PASSWORD_FAILED,
            payload: error
        };

        const expectedState = {
            ...initialState,
            setPasswordRequest: false,
            setPasswordFailed: true,
            setPasswordSuccess: false,
            error: error
        };

        expect(setPasswordReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle state change from success to request', () => {
        const successState = {
            ...initialState,
            setPasswordSuccess: true
        };

        const action = {
            type: SET_PASSWORD_REQUEST
        };

        const expectedState = {
            ...initialState,
            setPasswordRequest: true,
            setPasswordFailed: false,
            setPasswordSuccess: false
        };

        expect(setPasswordReducer(successState, action)).toEqual(expectedState);
    });

    it('should handle state change from error to request', () => {
        const errorState = {
            ...initialState,
            setPasswordFailed: true,
            error: 'Error'
        };

        const action = {
            type: SET_PASSWORD_REQUEST
        };

        const expectedState = {
            ...initialState,
            setPasswordRequest: true,
            setPasswordFailed: false,
            setPasswordSuccess: false,
            error: 'Error'
        };

        expect(setPasswordReducer(errorState, action)).toEqual(expectedState);
    });
});
