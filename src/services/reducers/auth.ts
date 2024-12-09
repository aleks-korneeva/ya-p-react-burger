import {IUserAuthAction, SET_AUTH_CHECKED, SET_USER} from "../actions/auth";
import {TUser} from "../../utils/types";

export type TAuthState = {
    user?: TUser | null;
    isAuthChecked: boolean;
};

const initialState: TAuthState = {
    user: null,
    isAuthChecked: false
}

export const authReducer = (state = initialState, action: IUserAuthAction) => {
    switch (action.type) {
        case SET_USER: {
            return {...state, user: action.payload};
        }
        case SET_AUTH_CHECKED: {
            return {...state, isAuthChecked: action.payload}
        }
        default:
            return state;
    }
}