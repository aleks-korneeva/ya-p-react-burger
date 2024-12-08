import {websocketMiddleware} from "./websocket-middleware";
import {TOrder} from "../../utils/types";
import {wsConnect, wsDisconnect} from "../actions/user-orders";
import {wsClose, Connecting, wsError, wsMessage, wsOpen} from "../reducers/user-orders";

export const userOrdersMiddleware = websocketMiddleware<TOrder[], unknown>({
    connect: wsConnect,
    disconnect: wsDisconnect,
    onConnecting: Connecting,
    onOpen: wsOpen,
    onClose: wsClose,
    onError: wsError,
    onMessage: wsMessage
})
