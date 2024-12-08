import {TOrder} from "../../utils/types";
import {GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, TGetOrderAction} from "../actions/get-order";

export type TOrderState = {
    order: TOrder | null,
    createOrderRequest: boolean,
    createOrderFailed: boolean
}

const initialState: TOrderState = {
    order: null,
    createOrderRequest: false,
    createOrderFailed: false,
}

export const getOrderReducer = (state: TOrderState = initialState, action: TGetOrderAction) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {...state, createOrderRequest: true };
        }
        case GET_ORDER_SUCCESS: {
            return {...state, createOrderRequest: false, createOrderFailed: false, orderNumber: action.payload };
        }
        case GET_ORDER_FAILED: {
            return {...state, orderNumber: null, createOrderRequest: false, createOrderFailed: true };
        }
        default:
            return state;
    }
}
