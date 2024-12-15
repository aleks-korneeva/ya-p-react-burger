import {
    ADD_BUN,
    ADD_INGREDIENT,
    MOVE_INGREDIENT,
    DELETE_INGREDIENT,
    DELETE_ALL_INGREDIENTS, IConstructorAction
} from "../actions/constructor-ingredients";
import {TIngredientWithKey} from "../../utils/types";

export type TConstructorIngredientsState = {
    bun?: TIngredientWithKey | null;
    ingredients: TIngredientWithKey[];
}

export const initialState: TConstructorIngredientsState = {
    bun: null,
    ingredients: []
}

export const burgerConstructorReducer = (state: TConstructorIngredientsState = initialState, action: IConstructorAction) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            return {...state, ingredients: [...state.ingredients, action.ingredient]}
        }
        case ADD_BUN: {
            return {...state, bun: action.ingredient}
        }
        case DELETE_INGREDIENT: {
            return {...state, ingredients: state.ingredients.filter(e => e.key !== action.key)}
        }
        case DELETE_ALL_INGREDIENTS: {
            return {...state, bun: null, ingredients: []}
        }
        case MOVE_INGREDIENT: {
            const updatedItems = [...state.ingredients];
            updatedItems.splice(action.toIndex, 0, updatedItems.splice(action.fromIndex, 1)[0]);
            return {...state, ingredients: updatedItems}
        }
        default:
            return state;
    }
}