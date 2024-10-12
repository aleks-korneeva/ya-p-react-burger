import {combineReducers} from 'redux';
import {ingredientReducer} from "./reducers/ingredients";
import {ingredientDetailsReducer} from "./reducers/current-ingredient";
import {createOrderReducer} from "./reducers/order";
import {burgerConstructorReducer} from "./reducers/constructor-ingredients";

export const rootReducer = combineReducers({
    ingredients: ingredientReducer,
    currentIngredient: ingredientDetailsReducer,
    order: createOrderReducer,
    burgerConstructor: burgerConstructorReducer
});