// @ts-ignore
import {v4 as uuidv4} from 'uuid';
import {TIngredient, TIngredientWithKey} from "../../utils/types";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const DELETE_ALL_INGREDIENTS = 'DELETE_ALL_INGREDIENTS';
export const ADD_BUN = 'ADD_BUN';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    ingredient: TIngredientWithKey;
}

export interface IDeleteIngredientAction {
    readonly type: typeof DELETE_INGREDIENT;
    key: string;
}

export interface IDeleteAllIngredientsAction {
    readonly type: typeof DELETE_ALL_INGREDIENTS;
}

export interface IAddBunAction {
    readonly type: typeof ADD_BUN;
    ingredient: TIngredient;
}

export interface IMoveIngredientAction {
    readonly type: typeof MOVE_INGREDIENT;
    fromIndex: number;
    toIndex: number;
}

export type IConstructorAction =
    IAddIngredientAction
    | IDeleteIngredientAction
    | IDeleteAllIngredientsAction
    | IAddBunAction
    | IMoveIngredientAction;

export const addIngredient = (ingredient: TIngredient): IAddIngredientAction => {
    return {
        type: ADD_INGREDIENT,
        ingredient: {
            ...ingredient,
            key: uuidv4()
        }
    }
}