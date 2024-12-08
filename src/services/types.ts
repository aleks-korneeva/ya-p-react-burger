import {store} from "./store";
import {IUserAuthAction} from "./actions/auth";
import {IConstructorAction} from "./actions/constructor-ingredients";
import {Action, ActionCreator} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TIngredientsAction} from "./actions/ingredients";
import {TLoginAction} from "./actions/login";
import {TLogoutAction} from "./actions/logout";
import {TOrderAction} from "./actions/create-order";
import {TResetPasswordAction} from "./actions/password-reset";
import {TRegisterAction} from "./actions/register";
import {TSetPasswordAction} from "./actions/set-password";
import {TUpdateUserAction} from "./actions/update-user";
import {TGetOrderAction} from "./actions/get-order";

export type RootState = ReturnType<typeof store.getState>;
type TApplicationActions = IUserAuthAction
    | IConstructorAction
    | TIngredientsAction
    | TLoginAction
    | TLogoutAction
    | TOrderAction
    | TResetPasswordAction
    | TRegisterAction
    | TSetPasswordAction
    | TUpdateUserAction
    | TGetOrderAction;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;