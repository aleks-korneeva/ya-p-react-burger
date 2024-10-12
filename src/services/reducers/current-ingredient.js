import {OPEN_INGREDIENT, CLOSE_INGREDIENT} from "../actions/current-ingredient";

const initialState = {
    isOpen: false,
    ingredientDetails: null
}

export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_INGREDIENT: {
            return {...state, ingredientDetails: action.ingredientDetails, isOpen: true}
        }
        case CLOSE_INGREDIENT: {
            return {...state, ingredientDetails: null, isOpen: false}
        }
        default:
            return state;
    }
}