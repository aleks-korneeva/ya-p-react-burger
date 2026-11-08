import {createOrderReducer, initialState} from "../../../services/reducers/create-order";
import {
    CLOSE_ORDER_MODAL,
    CREATE_ORDER_FAILED,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    OPEN_ORDER_MODAL
} from "../../../services/actions/create-order";

describe('createOrder reducer test', () => {
    it('should return initial state', () => {
        expect(createOrderReducer(undefined, {type: ''})).toEqual(initialState);
    })

    it ('should handle CREATE_ORDER_REQUEST', () => {
        const expectedState = {
            ...initialState,
            createOrderRequest: true
        }

        expect(createOrderReducer(initialState, {type: CREATE_ORDER_REQUEST})).toEqual(expectedState);
    })

    it('should handle CREATE_ORDER_SUCCESS', () => {
        const action = {
            type: CREATE_ORDER_SUCCESS,
            orderNumber: 123
        }
        const expectedState = {
            ...initialState,
            createOrderRequest: false,
            createOrderFailed: false,
            orderNumber: 123
        }

        expect(createOrderReducer(initialState, action)).toEqual(expectedState);
    })

    it('should handle CREATE_ORDER_FAILED', () => {
        const expectedState = {
            ...initialState,
            orderNumber: null,
            createOrderFailed: true
        }

        expect(createOrderReducer(initialState, {type: CREATE_ORDER_FAILED})).toEqual(expectedState);
    })

    it('should handle OPEN_ORDER_MODAL', () => {
        const expectedState = {
            ...initialState,
            isOpen: true
        }
        expect(createOrderReducer(initialState, {type: OPEN_ORDER_MODAL})).toEqual(expectedState);
    })

    it('should handle CLOSE_ORDER_MODAL', () => {
        const expectedState = {
            ...initialState,
            isOpen: false,
            orderNumber: null
        }

        expect(createOrderReducer(initialState, {type: CLOSE_ORDER_MODAL})).toEqual(expectedState)
    })
})