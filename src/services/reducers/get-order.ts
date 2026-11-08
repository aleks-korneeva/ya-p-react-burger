import {TOrder} from "../../utils/types";
import {GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, TGetOrderAction} from "../actions/get-order";

export type TOrderState = {
    orders: TOrder[] | null,
    getOrderRequest: boolean,
    getOrderFailed: boolean
}

export const initialState: TOrderState = {
    orders: null,
    getOrderRequest: false,
    getOrderFailed: false,
}

export const getOrderReducer = (state: TOrderState = initialState, action: TGetOrderAction) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {...state, getOrderRequest: true };
        }
        case GET_ORDER_SUCCESS: {
            return {...state, getOrderRequest: false, getOrderFailed: false, orders: action.payload };
        }
        case GET_ORDER_FAILED: {
            return {...state, orders: null, getOrderRequest: false, getOrderFailed: true };
        }
        default:
            return state;
    }
}
