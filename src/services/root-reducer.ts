import {combineReducers} from 'redux';
import {ingredientReducer} from "./reducers/ingredients";
import {createOrderReducer} from "./reducers/create-order";
import {burgerConstructorReducer} from "./reducers/constructor-ingredients";
import {passwordResetReducer} from "./reducers/password-reset";
import {setPasswordReducer} from "./reducers/set-password";
import {authReducer} from "./reducers/auth";
import {logoutReducer} from "./reducers/logout";
import {loginReducer} from "./reducers/login";
import {updateUserReducer} from "./reducers/update-user";
import {registerReducer} from "./reducers/register";
import {getOrderReducer} from "./reducers/get-order";

export const rootReducer = combineReducers({
    ingredients: ingredientReducer,
    order: createOrderReducer,
    burgerConstructor: burgerConstructorReducer,
    passwordReset: passwordResetReducer,
    setPassword: setPasswordReducer,
    auth: authReducer,
    logout: logoutReducer,
    login: loginReducer,
    updateUser: updateUserReducer,
    register: registerReducer,
    getOrder: getOrderReducer
});