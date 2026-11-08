import {REGISTER_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS, TRegisterAction} from "../actions/register";

export type TRegisterState = {
    registerRequest: boolean,
    registerSuccess: boolean,
    registerFailed: boolean,
    error: any,
}

export const initialState: TRegisterState = {
    registerRequest: false,
    registerSuccess: false,
    registerFailed: false,
    error: null,
}

export const registerReducer = (state: TRegisterState = initialState, action: TRegisterAction) => {
    switch (action.type) {
        case REGISTER_REQUEST: {
            return {...state, registerRequest: true, registerSuccess: false, registerFailed: false, error: null };
        }
        case REGISTER_SUCCESS: {
            return {...state, registerRequest: false, registerSuccess: true, registerFailed: false, error: null };
        }
        case REGISTER_FAILED: {
            return {...state, registerRequest: false, registerSuccess: false, registerFailed: true, error: action.payload };
        }
        default:
            return state;
    }
}