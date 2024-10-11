import {ADD_BUN, ADD_INGREDIENT, DELETE_INGREDIENT} from "../actions/constructor-ingredients";
import {v4} from 'uuid';

const initialState = {
    bun: null,
    ingredients: []
}

export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            return {...state, ingredients: [...state.ingredients, {...action.ingredient, key: v4()}]}
        }
        case ADD_BUN: {
            return {...state, bun: action.ingredient}
        }
        case DELETE_INGREDIENT: {
            return {...state, ingredients: state.ingredients.filter(e => e.key !== action.key)}
        }
        default:
            return state;
    }
}