import {getOrder as fetchOrder}  from "../../utils/api";
import {TOrder} from "../../utils/types";
import {AppDispatch} from "../types";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export interface IGetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly payload: TOrder[];
}

export interface IGetOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED;
}

export type TGetOrderAction =
    IGetOrderRequestAction
    | IGetOrderSuccessAction
    | IGetOrderFailedAction;

export function getOrder(number: number) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        })

        fetchOrder(number)
            .then(data => {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    payload: data.orders
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_ORDER_FAILED,
                    error: error
                })
            })
    }
}