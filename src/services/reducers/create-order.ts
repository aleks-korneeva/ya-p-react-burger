import {
    CLOSE_ORDER_MODAL,
    CREATE_ORDER_FAILED,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    OPEN_ORDER_MODAL, TOrderAction
} from "../actions/create-order";

export type TOrderState = {
    orderNumber: number | null,
    createOrderRequest: boolean,
    createOrderFailed: boolean,
    isOpen: boolean
}

export const initialState: TOrderState = {
    orderNumber: null,
    createOrderRequest: false,
    createOrderFailed: false,
    isOpen: false
}

export const createOrderReducer = (state: TOrderState = initialState, action: TOrderAction) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST: {
            return {...state, createOrderRequest: true };
        }
        case CREATE_ORDER_SUCCESS: {
            return {...state, createOrderRequest: false, createOrderFailed: false, orderNumber: action.orderNumber };
        }
        case CREATE_ORDER_FAILED: {
            return {...state, orderNumber: null, createOrderRequest: false, createOrderFailed: true };
        }
        case OPEN_ORDER_MODAL: {
            return {...state, isOpen: true};
        }
        case CLOSE_ORDER_MODAL: {
            return {...state, isOpen: false, orderNumber: null};
        }
        default:
            return state;
    }
}
