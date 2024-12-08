import {TOrders} from "../../utils/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {WebsocketStatus} from "../../utils/web-socket-status";

export type TOrdersStatisticStore = {
    status: WebsocketStatus
    statistic: TOrders | null;
    connectionError: string | null;
}

const initialState: TOrdersStatisticStore = {
    status: WebsocketStatus.OFFLINE,
    statistic: null,
    connectionError: null
}

export const orderStatisticSlice = createSlice({
    name: "orderStatistic",
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
            state.statistic = action.payload;
        }
    },
    selectors: {
        getStatus: state => state.status,
        getStatistic: state => state.statistic,
        getError: state => state.connectionError,
    }
})

export const {wsConnecting, wsOpen, wsClose, wsError, wsMessage} = orderStatisticSlice.actions;

type TActionCreators = typeof orderStatisticSlice.actions;
export type TOrderStatisticActions = ReturnType<TActionCreators[keyof TActionCreators]>