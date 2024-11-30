import {AppDispatch, AppThunk, RootState} from "../services/types";
import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

// @ts-ignore todo азобраться с ошибкой
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();