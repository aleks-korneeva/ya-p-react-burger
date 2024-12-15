import {TOrders} from "../../utils/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {WebsocketStatus} from "../../utils/web-socket-status";

export type TUserOrdersState = {
    status: WebsocketStatus
    orders: TOrders | null;
    connectionError: string | null;
}

export const initialState: TUserOrdersState = {
    status: WebsocketStatus.OFFLINE,
    orders: null,
    connectionError: null
}

export const userOrdersSlice = createSlice({
    name: "userOrders",
    initialState,
    reducers: {
        wsConnecting: (state) => {
            state.status = WebsocketStatus.CONNECTING;
        },
        wsOpen: (state) => {
            state.status = WebsocketStatus.ONLINE;
        },
        wsClose: (state) => {
            state.status = WebsocketStatus.OFFLINE;
        },
        wsError: (state, action: PayloadAction<string>) => {
            state.connectionError = action.payload;
        },
        wsMessage: (state, action: PayloadAction<TOrders>) => {
            state.orders = action.payload;
        }
    },
    selectors: {
        getStatus: state => state.status,
        getOrders: state => state.orders,
        getError: state => state.connectionError,
    }
})

export const {wsConnecting, wsOpen, wsClose, wsError, wsMessage} = userOrdersSlice.actions;

export type TActionCreators = typeof userOrdersSlice.actions;
export type TUserOrdersActions = ReturnType<TActionCreators[keyof TActionCreators]>