import {initialState, logoutReducer} from "../../../services/reducers/logout";
import {LOGOUT_FAILED, LOGOUT_REQUEST, LOGOUT_SUCCESS} from "../../../services/actions/logout";

describe('logout reducer test', () => {
    it('should return initial state', () => {
        expect(logoutReducer(undefined, {type: ''})).toEqual(initialState);
    })

    it('should handle LOGOUT_REQUEST', () => {
        const expectedState = {
            ...initialState,
            logoutRequest: true
        }

        expect(logoutReducer(initialState, {type: LOGOUT_REQUEST})).toEqual(expectedState);
    })

    it('should handle LOGOUT_SUCCESS', () => {
        const action = {
            type: LOGOUT_SUCCESS
        }

        const expectedState = {
            ...initialState,
            logoutSuccess: true
        }

        expect(logoutReducer(initialState, action)).toEqual(expectedState);
    })

    it('should handle LOGOUT_FAILED', () => {
        const error = {
            success: false
        }

        const action = {
            type: LOGOUT_FAILED,
            payload: error
        }
        const expectedState = {
            ...initialState,
            logoutFailed: true,
            error: error
        }

        expect(logoutReducer(initialState, action)).toEqual(expectedState);
    })
})