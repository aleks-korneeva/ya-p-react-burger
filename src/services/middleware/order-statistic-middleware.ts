import {websocketMiddleware} from "./websocket-middleware";
import {TOrders} from "../../utils/types";
import {wsConnect, wsDisconnect} from "../actions/order-statistic";
import {wsClose, wsConnecting, wsError, wsMessage, wsOpen} from "../reducers/order-statistic";

export const orderStatisticMiddleware = websocketMiddleware<TOrders, unknown>({
    connect: wsConnect,
    disconnect: wsDisconnect,
    onConnecting: wsConnecting,
    onOpen: wsOpen,
    onClose: wsClose,
    onError: wsError,
    onMessage: wsMessage
})
