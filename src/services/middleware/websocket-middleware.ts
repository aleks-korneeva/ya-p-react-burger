import {Middleware} from "redux";
import {RootState} from "../store";
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {refreshToken} from "../../utils/api";

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

const RECONNECT_PERIOD = 3000;

export const websocketMiddleware = <R, S>(wsActions: TWSActions<R, S>, withTokenRefresh: boolean = false): Middleware<NonNullable<unknown>, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null;
        let url = "";
        let isConnected = false;
        let reconnectTimer = 0;
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

                url = action.payload;
                console.log(url)
                isConnected = true;

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

                        if (withTokenRefresh && parsedData.message === "Invalid or missing token") {
                            refreshToken()
                                .then((data) => {
                                const wsUrl = new URL(url);
                                wsUrl.searchParams.set("token", data.accessToken.replace("Bearer ", ""));
                                dispatch(connect(wsUrl.toString()))
                            }).catch((error) => {
                                dispatch(onError(error));
                            })

                            dispatch(disconnect());
                            return;
                        }
                        dispatch(onMessage(parsedData));
                    } catch (error) {
                        dispatch(onError((error as Error).message));
                    }
                }

                socket.onclose = () => {
                    onClose && dispatch(onClose());

                    if (isConnected) {
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(connect(url))
                        }, RECONNECT_PERIOD);
                    }
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
                clearTimeout(reconnectTimer);
                isConnected = false;
                reconnectTimer = 0;
                socket.close();
                socket = null;
            }

            next(action);
        }
    }
}