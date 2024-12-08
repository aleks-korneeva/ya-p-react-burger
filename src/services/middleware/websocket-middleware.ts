import {Middleware} from "redux";
import {RootState} from "../store";
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";

export type TWSActions<R, S> = {
    connect: ActionCreatorWithPayload<string>;
    disconnect: ActionCreatorWithoutPayload;
    onConnecting?: ActionCreatorWithoutPayload;
    onOpen?: ActionCreatorWithoutPayload;
    onClose?: ActionCreatorWithoutPayload;
    onError: ActionCreatorWithPayload<string>;
    onMessage: ActionCreatorWithPayload<R>;
    sendMessage?: ActionCreatorWithPayload<S>;
}

export const websocketMiddleware = <R, S>(wsActions: TWSActions<R, S>): Middleware<NonNullable<unknown>, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null;
        const {
            connect,
            disconnect,
            onConnecting,
            onOpen,
            onClose,
            onError,
            onMessage,
            sendMessage
        } = wsActions;
        return (next) => (action) => {
            const { dispatch } = store;
            if (connect.match(action)) {
                socket = new WebSocket(action.payload);
                onConnecting && dispatch(onConnecting());

                socket.onopen = () => {
                    onOpen && dispatch(onOpen());
                }

                socket.onerror = (e) => {
                    dispatch(onError("Error"))
                }

                socket.onmessage = (e) => {
                    const {data} = e;
                    try {
                        const parsedData = JSON.parse(data);
                        dispatch(onMessage(parsedData));
                    } catch (error) {
                        dispatch(onError((error as Error).message));
                    }
                }

                socket.onclose = () => {
                    onClose && dispatch(onClose());
                }
            }
            if (socket && sendMessage?.match(action)) {
                try {
                    socket.send(JSON.stringify(action.payload));
                } catch (error) {
                    dispatch(onError((error as Error).message))
                }
            }

            if (socket && disconnect.match(action)) {
                socket.close();
                socket = null;
            }

            next(action);
        }
    }
}