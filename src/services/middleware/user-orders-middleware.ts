import {websocketMiddleware} from "./websocket-middleware";
import {TOrders} from "../../utils/types";
import {wsConnect, wsDisconnect} from "../actions/user-orders";
import {wsClose, wsConnecting, wsError, wsMessage, wsOpen} from "../reducers/user-orders";

export const userOrdersMiddleware = websocketMiddleware<TOrders, unknown>({
    connect: wsConnect,
    disconnect: wsDisconnect,
    onConnecting: wsConnecting,
    onOpen: wsOpen,
    onClose: wsClose,
    onError: wsError,
    onMessage: wsMessage
}, true)
