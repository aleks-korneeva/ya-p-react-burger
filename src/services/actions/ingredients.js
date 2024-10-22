import {request} from '../../utils/api';

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

const apiEndpoint = 'ingredients';

export function getIngredients() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS
        })

        request(apiEndpoint)
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