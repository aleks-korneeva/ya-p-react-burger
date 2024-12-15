import {getOrderReducer, initialState} from "../../../services/reducers/get-order";
import {GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS} from "../../../services/actions/get-order";

describe('getOrder reducer test', () => {
    it('should return initial state', () => {
        expect(getOrderReducer(undefined, {type: ''})).toEqual(initialState);
    })

    it ('should handle GET_ORDER_REQUEST', () => {
        const expectedState = {
            ...initialState,
            getOrderRequest: true
        }

        expect(getOrderReducer(initialState, {type: GET_ORDER_REQUEST})).toEqual(expectedState);
    })

    it('should handle GET_ORDER_SUCCESS', () => {
        const orders = [
            {
                number: 1
            },
            {
                number: 2
            }
        ]

        const action = {
            type: GET_ORDER_SUCCESS,
            payload: orders
        }

        const expectedState = {
            ...initialState,
            getOrderRequest: false,
            orders: orders
        }

        expect(getOrderReducer(initialState, action)).toEqual(expectedState);
    })

    it('should handle GET_ORDER_FAILED', () => {
        const expectedState = {
            ...initialState,
            getOrderFailed: true,
            orders: null,
        }

        expect(getOrderReducer(initialState, {type: GET_ORDER_FAILED})).toEqual(expectedState);
    })
})