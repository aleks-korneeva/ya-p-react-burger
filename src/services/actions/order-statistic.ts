import {createAction} from "@reduxjs/toolkit";

export const wsConnect = createAction<string, "orderStatistic/connect">("orderStatistic/connect");
export const wsDisconnect = createAction("orderStatistic/disconnect");

export type TWSOrderStatisticActions =
    | ReturnType<typeof wsConnect>
    | ReturnType<typeof wsDisconnect>;

