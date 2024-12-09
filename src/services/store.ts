import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./root-reducer";
import {userOrdersMiddleware} from "./middleware/user-orders-middleware";
import {orderStatisticMiddleware} from "./middleware/order-statistic-middleware";

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddlewares) => {
        return getDefaultMiddlewares().concat(orderStatisticMiddleware, userOrdersMiddleware);
    }
});

export type RootState = ReturnType<typeof rootReducer>
