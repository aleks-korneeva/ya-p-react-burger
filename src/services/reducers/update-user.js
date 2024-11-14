import {UPDATE_USER_FAILED, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS} from "../actions/update-user";

const initialState = {
    updateUserRequest: false,
    updateUserSuccess: false,
    updateUserFailed: false,
    error: null,
}

export const updateUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_REQUEST: {
            return {...state, updateUserRequest: true, updateUserSuccess: false, updateUserFailed: false };
        }
        case UPDATE_USER_SUCCESS: {
            return {...state, updateUserRequest: false, updateUserSuccess: true, updateUserFailed: false };
        }
        case UPDATE_USER_FAILED: {
            return {...state, updateUserRequest: false, updateUserSuccess: false, updateUserFailed: true, error: action.payload };
        }
        default:
            return state;
    }
}