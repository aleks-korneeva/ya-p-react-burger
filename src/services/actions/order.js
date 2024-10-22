import {request} from "../../utils/api";

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';

const apiEndpoint = 'orders';

export function createOrder(ingredients) {
    return function (dispatch) {
        dispatch({
            type: CREATE_ORDER_REQUEST
        })

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                ingredients: ingredients
            })
        }

        request(apiEndpoint, requestOptions)
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