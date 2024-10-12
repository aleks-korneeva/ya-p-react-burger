import {GET_INGREDIENTS, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED} from "../actions/ingredients";

const initialState = {
    ingredients: [],
    ingredientRequest: false,
    ingredientFailed: false
}

export const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS: {
            return {...state, ingredientRequest: true };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {...state, ingredientRequest: false, ingredientFailed: false, ingredients: action.ingredients };
        }
        case GET_INGREDIENTS_FAILED: {
            return {...state, ingredients: [], ingredientRequest: false, ingredientFailed: true };
        }
        default:
            return state;
    }
}

