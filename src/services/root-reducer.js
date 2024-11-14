import {combineReducers} from 'redux';
import {ingredientReducer} from "./reducers/ingredients";
import {ingredientDetailsReducer} from "./reducers/current-ingredient";
import {createOrderReducer} from "./reducers/order";
import {burgerConstructorReducer} from "./reducers/constructor-ingredients";
import {passwordResetReducer} from "./reducers/password-reset";
import {setPasswordReducer} from "./reducers/set-password";
import {authReducer} from "./reducers/auth";
import {logoutReducer} from "./reducers/logout";

export const rootReducer = combineReducers({
    ingredients: ingredientReducer,
    currentIngredient: ingredientDetailsReducer,
    order: createOrderReducer,
    burgerConstructor: burgerConstructorReducer,
    passwordReset: passwordResetReducer,
    setPassword: setPasswordReducer,
    auth: authReducer,
    logout: logoutReducer
});