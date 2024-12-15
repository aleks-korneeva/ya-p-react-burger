
import {
    REGISTER_FAILED,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
} from "../../../services/actions/register";
import {initialState, registerReducer} from "../../../services/reducers/register";

describe('registerReducer test', () => {
    it('should return initial state', () => {
        expect(registerReducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should handle REGISTER_REQUEST', () => {
        const action = {
            type: REGISTER_REQUEST
        };

        const expectedState = {
            ...initialState,
            registerRequest: true,
            registerSuccess: false,
            registerFailed: false
        };

        expect(registerReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle REGISTER_SUCCESS', () => {
        const action = {
            type: REGISTER_SUCCESS
        };

        const expectedState = {
            ...initialState,
            registerSuccess: true
        };

        expect(registerReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle REGISTER_FAILED', () => {
        const error = 'Registration error';
        const action = {
            type: REGISTER_FAILED,
            payload: error
        };

        const expectedState = {
            ...initialState,
            registerFailed: true,
            error: error
        };

        expect(registerReducer(initialState, action)).toEqual(expectedState);
    });

    // Проверка перехода из успешного состояния в состояние нового запроса
    it('should handle state change from success to request', () => {
        const successState = {
            ...initialState,
            registerSuccess: true
        };

        const action = {
            type: REGISTER_REQUEST
        };

        const expectedState = {
            ...initialState,
            registerRequest: true
        };

        expect(registerReducer(successState, action)).toEqual(expectedState);
    });

    it('should handle state change from error to request', () => {
        const errorState = {
            ...initialState,
            registerFailed: true,
            error: 'Previous error'
        };

        const action = {
            type: REGISTER_REQUEST
        };

        const expectedState = {
            ...initialState,
            registerRequest: true,
            error: null
        };

        expect(registerReducer(errorState, action)).toEqual(expectedState);
    });
});
