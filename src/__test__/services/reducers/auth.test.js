import {authReducer, initialState} from "../../../services/reducers/auth";
import {SET_AUTH_CHECKED, SET_USER} from "../../../services/actions/auth";

describe('auth reducer test', () => {
    it('should return initial state', () => {
        expect(authReducer(undefined, { type: '' })).toEqual(initialState);
    });

    it ('should handle SET_USER', () => {
        const user = {
            name: 'userName',
            email: 'user@email.com'
        }
        const action = {
            type: SET_USER,
            payload: user
        }

        const expectedState = {
            ...initialState,
            user: user
        }

        expect(authReducer(initialState, action)).toEqual(expectedState)
    });

    it('should handle SET_AUTH_CHECKED', () => {
        const action = {
            type: SET_AUTH_CHECKED,
            payload: true
        }

        const expectedState = {
            ...initialState,
            isAuthChecked: true
        }

        expect(authReducer(initialState, action)).toEqual(expectedState);
    });
});
