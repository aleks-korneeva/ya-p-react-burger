import {initialState, loginReducer} from "../../../services/reducers/login";
import {LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS} from "../../../services/actions/login";

describe('login reducer test', () => {
    it('should return initial state', () => {
        expect(loginReducer(undefined, {type: ''})).toEqual(initialState);
    })

    it('should handle LOGIN_REQUEST', () => {
        const expectedState = {
            ...initialState,
            loginRequest: true
        }

        expect(loginReducer(initialState, {type: LOGIN_REQUEST})).toEqual(expectedState);
    })

    it('should handle LOGIN_SUCCESS', () => {
        const action = {
            type: LOGIN_SUCCESS
        }

        const expectedState = {
            ...initialState,
            loginSuccess: true
        }

        expect(loginReducer(initialState, action)).toEqual(expectedState);
    })

    it('should handle LOGIN_FAILED', () => {
        const error = {
            success: false
        }

        const action = {
            type: LOGIN_FAILED,
            payload: error
        }
        const expectedState = {
            ...initialState,
            loginFailed: true,
            error: error
        }

        expect(loginReducer(initialState, action)).toEqual(expectedState);
    })
})