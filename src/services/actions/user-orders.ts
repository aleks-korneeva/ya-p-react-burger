import {createAction} from "@reduxjs/toolkit";

export const wsConnect = createAction<string, "userOrders/connect">("userOrders/connect");
export const wsDisconnect = createAction("userOrders/disconnect");

export type TWSUserOrdersActions =
    | ReturnType<typeof wsConnect>
    | ReturnType<typeof wsDisconnect>;

