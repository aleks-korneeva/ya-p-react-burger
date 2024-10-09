import {
    CLOSE_ORDER_MODAL,
    CREATE_ORDER_FAILED,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    OPEN_ORDER_MODAL
} from "../actions/order";

const initialState = {
    orderNumber: null,
    createOrderRequest: false,
    createOrderFailed: false,
    isOpen: false
}

export const createOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST: {
            return {...state, createOrderRequest: true };
        }
        case CREATE_ORDER_SUCCESS: {
            return {...state, createOrderRequest: false, createOrderFailed: false, orderNumber: action.orderNumber };
        }
        case CREATE_ORDER_FAILED: {
            return {...state, createOrderRequest: false, createOrderFailed: true };
        }
        case OPEN_ORDER_MODAL: {
            return {...state, isOpen: true};
        }
        case CLOSE_ORDER_MODAL: {
            return {...state, isOpen: false};
        }
        default:
            return state;
    }
}
