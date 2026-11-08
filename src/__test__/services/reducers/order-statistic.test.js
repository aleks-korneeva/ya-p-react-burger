import {initialState, orderStatisticSlice} from "../../../services/reducers/order-statistic";
import {WebsocketStatus} from "../../../utils/web-socket-status";

describe('orderStatistic reducer test', () => {
    it('should return initial state', () => {
        expect(orderStatisticSlice.reducer(undefined, {type: ''})).toEqual(initialState);
    })

    it('should handle wsConnecting', () => {
        const expectedState = {
            ...initialState,
            status: WebsocketStatus.CONNECTING
        }

        expect(orderStatisticSlice.reducer(initialState, orderStatisticSlice.actions.wsConnecting())).toEqual(expectedState);
    })

    it('should handle wsOpen', () => {
        const expectedState = {
            ...initialState,
            status: WebsocketStatus.ONLINE
        }

        expect(orderStatisticSlice.reducer(initialState, orderStatisticSlice.actions.wsOpen())).toEqual(expectedState);
    })

    it('should handle wsClose', () => {
        const state = {
            ...initialState,
            status: WebsocketStatus.ONLINE
        };

        expect(orderStatisticSlice.reducer(state, orderStatisticSlice.actions.wsClose())).toEqual({
            ...state,
            status: WebsocketStatus.OFFLINE
        });
    });

    it('should handle wsError', () => {
        const errorMessage = 'Error message';

        const expectedState = {
            ...initialState,
            connectionError: errorMessage
        }

        expect(orderStatisticSlice.reducer(
            initialState,
            orderStatisticSlice.actions.wsError(errorMessage)
        )).toEqual(expectedState);
    });

    it('should handle wsMessage', () => {
        const mockOrders = {
            success: true,
            orders: [],
            total: 0,
            totalToday: 0
        };

        const expectedState = {
            ...initialState,
            statistic: mockOrders
        }

        expect(orderStatisticSlice.reducer(
            initialState,
            orderStatisticSlice.actions.wsMessage(mockOrders)
        )).toEqual(expectedState);
    });
})

describe('orderStatistic selectors test', () => {
    const state = {
        orderStatistic: {
            status: WebsocketStatus.ONLINE,
            statistic: {
                success: true,
                orders: [],
                total: 10,
                totalToday: 5
            },
            connectionError: null
        }
    };

    it('should select status', () => {
        expect(orderStatisticSlice.selectors.getStatus(state))
            .toEqual(WebsocketStatus.ONLINE);
    });

    it('should select statistic', () => {
        expect(orderStatisticSlice.selectors.getStatistic(state))
            .toEqual(state.orderStatistic.statistic);
    });

    it('should select error', () => {
        expect(orderStatisticSlice.selectors.getError(state))
            .toEqual(null);
    });
});