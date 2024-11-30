import {request} from "../../utils/api";
import {StorageKey} from "../../utils/storage-key";
import {TResponse} from "../../utils/types";
import {AppDispatch} from "../types";

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';

export interface ICreateOrderRequestAction {
    readonly type: typeof CREATE_ORDER_REQUEST;
}

export interface ICreateOrderSuccessAction {
    readonly type: typeof CREATE_ORDER_SUCCESS;
    readonly orderNumber: number;
}

export interface ICreateOrderFailedAction {
    readonly type: typeof CREATE_ORDER_FAILED;
}

export interface IOpenOrderModalAction {
    readonly type: typeof OPEN_ORDER_MODAL;
}

export interface ICloseOrderModalAction {
    readonly type: typeof CLOSE_ORDER_MODAL;
}

export type TOrderAction =
    ICreateOrderRequestAction
    | ICreateOrderSuccessAction
    | ICreateOrderFailedAction
    | IOpenOrderModalAction
    | ICloseOrderModalAction;

const apiEndpoint = 'orders';

type TOrderResponse = TResponse & {
    order: {number: number}
}

export function createOrder(ingredients: string[]) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: CREATE_ORDER_REQUEST
        })

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: localStorage.getItem(StorageKey.ACCESS_TOKEN) || ''
            },
            body: JSON.stringify({
                ingredients: ingredients
            })
        }

        request<TOrderResponse>(apiEndpoint, requestOptions)
            .then(data => {
                dispatch({
                    type: CREATE_ORDER_SUCCESS,
                    orderNumber: data.order.number
                })
            })
            .catch(error => {
                dispatch({
                    type: CREATE_ORDER_FAILED,
                    error: error
                })
            })
    }
}