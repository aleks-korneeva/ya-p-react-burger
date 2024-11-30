import {REGISTER_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS, TRegisterAction} from "../actions/register";

export type TRegisterState = {
    registerRequest: boolean,
    registerSuccess: boolean,
    registerFailed: boolean,
    error: any,
}

const initialState: TRegisterState = {
    registerRequest: false,
    registerSuccess: false,
    registerFailed: false,
    error: null,
}

export const registerReducer = (state: TRegisterState = initialState, action: TRegisterAction) => {
    switch (action.type) {
        case REGISTER_REQUEST: {
            return {...state, registerRequest: true, registerSuccess: false, registerFailed: false };
        }
        case REGISTER_SUCCESS: {
            return {...state, registerRequest: false, registerSuccess: true, registerFailed: false };
        }
        case REGISTER_FAILED: {
            return {...state, registerRequest: false, registerSuccess: false, registerFailed: true, error: action.payload };
        }
        default:
            return state;
    }
}