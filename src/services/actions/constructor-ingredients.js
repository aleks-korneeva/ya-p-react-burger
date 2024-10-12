import {v4 as uuidv4} from 'uuid';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const DELETE_ALL_INGREDIENTS = 'DELETE_ALL_INGREDIENTS';
export const ADD_BUN = 'ADD_BUN';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

export const addIngredient = (ingredient) => {
    return {
        type: ADD_INGREDIENT,
        ingredient: {
            ...ingredient,
            key: uuidv4()
        }
    }
}