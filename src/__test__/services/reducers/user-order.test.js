import {userOrdersSlice, initialState} from '../../../services/reducers/user-orders';
import {WebsocketStatus} from "../../../utils/web-socket-status";

const { wsConnecting, wsOpen, wsClose, wsError, wsMessage } = userOrdersSlice.actions;

describe('userOrdersSlice test', () => {
    it('should return initial state', () => {
        expect(userOrdersSlice.reducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should handle Connecting', () => {
        const expectedState = {
            ...initialState,
            status: WebsocketStatus.CONNECTING
        }

        expect(userOrdersSlice.reducer(initialState, wsConnecting())).toEqual(expectedState);
    });

    it('should handle wsOpen', () => {
        const expectedState = {
            ...initialState,
            status: WebsocketStatus.ONLINE
        }

        expect(userOrdersSlice.reducer(initialState, wsOpen())).toEqual(expectedState);
    });

    it('should handle wsClose', () => {
        const onlineState = {
            ...initialState,
            status: WebsocketStatus.ONLINE
        };

        const expectedState = {
            ...initialState,
            status: WebsocketStatus.OFFLINE
        }

        expect(userOrdersSlice.reducer(onlineState, wsClose())).toEqual(expectedState);
    });

    it('should handle wsError', () => {
        const errorMessage = 'Error message';

        const expectedState = {
            ...initialState,
            connectionError: errorMessage
        }

        expect(userOrdersSlice.reducer(initialState, wsError(errorMessage))).toEqual(expectedState);
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
            orders: mockOrders
        }

        expect(userOrdersSlice.reducer(initialState, wsMessage(mockOrders))).toEqual(expectedState);
    });

    describe('selectors', () => {
        const state = {
            userOrders: {
                status: WebsocketStatus.ONLINE,
                orders: {
                    success: true,
                    orders: [],
                    total: 0,
                    totalToday: 0
                },
                connectionError: 'Test error'
            }
        };

        it('should select status', () => {
            expect(userOrdersSlice.selectors.getStatus(state))
                .toBe(WebsocketStatus.ONLINE);
        });

        it('should select orders', () => {
            expect(userOrdersSlice.selectors.getOrders(state))
                .toEqual({
                    success: true,
                    orders: [],
                    total: 0,
                    totalToday: 0
                });
        });

        it('should select error', () => {
            expect(userOrdersSlice.selectors.getError(state))
                .toBe('Test error');
        });
    });
});
