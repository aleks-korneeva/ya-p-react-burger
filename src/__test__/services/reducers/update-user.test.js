import { updateUserReducer, initialState } from "../../../services/reducers/update-user";
import {
    UPDATE_USER_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS
} from "../../../services/actions/update-user";

describe('updateUserReducer test', () => {
    it('should return initial state', () => {
        expect(updateUserReducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should handle UPDATE_USER_REQUEST', () => {
        const action = {
            type: UPDATE_USER_REQUEST
        };

        const expectedState = {
            ...initialState,
            updateUserRequest: true,
            updateUserSuccess: false,
            updateUserFailed: false
        };

        expect(updateUserReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle UPDATE_USER_SUCCESS', () => {
        const action = {
            type: UPDATE_USER_SUCCESS
        };

        const expectedState = {
            ...initialState,
            updateUserRequest: false,
            updateUserSuccess: true,
            updateUserFailed: false
        };

        expect(updateUserReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle UPDATE_USER_FAILED', () => {
        const error = 'Update user error';
        const action = {
            type: UPDATE_USER_FAILED,
            payload: error
        };

        const expectedState = {
            ...initialState,
            updateUserRequest: false,
            updateUserSuccess: false,
            updateUserFailed: true,
            error: error
        };

        expect(updateUserReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle state change from success to request', () => {
        const successState = {
            ...initialState,
            updateUserSuccess: true
        };

        const action = {
            type: UPDATE_USER_REQUEST
        };

        const expectedState = {
            ...initialState,
            updateUserRequest: true,
            updateUserSuccess: false,
            updateUserFailed: false
        };

        expect(updateUserReducer(successState, action)).toEqual(expectedState);
    });

    it('should handle state change from error to request', () => {
        const errorState = {
            ...initialState,
            updateUserFailed: true,
            error: 'Error'
        };

        const action = {
            type: UPDATE_USER_REQUEST
        };

        const expectedState = {
            ...initialState,
            updateUserRequest: true,
            updateUserSuccess: false,
            updateUserFailed: false,
            error: 'Error'
        };

        expect(updateUserReducer(errorState, action)).toEqual(expectedState);
    });
});
