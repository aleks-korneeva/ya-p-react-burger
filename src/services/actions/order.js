import {urlCreateOrder} from "../../utils/api";

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';

export function createOrder(ingredients) {
    return function(dispatch) {
        dispatch({
            type: CREATE_ORDER_REQUEST
        })

        fetch(urlCreateOrder, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                ingredients: ingredients
            })
        }).then(response => {
            if (response && response.ok) {
                return response.json()
            } else {
                return Promise.reject(`Error with status code ${response.status} ${response.statusText}`);
            }
        }).then(data => {
            dispatch({
                type: CREATE_ORDER_SUCCESS,
                orderNumber: data.order.number
            })
        }).catch(error => {
            dispatch({
                type: CREATE_ORDER_FAILED,
                error: error
            })
        })
    }
}