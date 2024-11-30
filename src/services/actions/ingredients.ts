import {request} from '../../utils/api';
import {TIngredient, TResponse} from "../../utils/types";
import {AppDispatch} from "../types";

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export interface IGetIngredientsAction {
    type: typeof GET_INGREDIENTS;
}

export interface IGetIngredientsSuccessAction {
    type: typeof GET_INGREDIENTS_SUCCESS;
    ingredients: TIngredient[];
}

export interface IGetIngredientsFailedAction {
    type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsAction =
    IGetIngredientsAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsFailedAction;

const apiEndpoint = 'ingredients';

type TIngredientResponse = TResponse & {
    data: TIngredient[];
}

export function getIngredients() {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_INGREDIENTS
        })

        request<TIngredientResponse>(apiEndpoint)
            .then(data => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: data.data
                })
            })
            .catch(() => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
            })
    }
}