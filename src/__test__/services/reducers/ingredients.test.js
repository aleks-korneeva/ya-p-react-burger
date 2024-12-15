
import {ingredientReducer, initialState} from "../../../services/reducers/ingredients";
import {GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS} from "../../../services/actions/ingredients";

describe('ingredients reducer test', () => {
    it('should return initial state', () => {
        expect(ingredientReducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should handle GET_INGREDIENTS', () => {
        const action = {
            type: GET_INGREDIENTS
        };

        const expectedState = {
            ...initialState,
            ingredientRequest: true
        };

        expect(ingredientReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        const mockIngredients = [
            { _id: '1', name: 'Ingredient 1' },
            { _id: '2', name: 'Ingredient 2' }
        ];

        const action = {
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: mockIngredients
        };

        const expectedState = {
            ...initialState,
            ingredientRequest: false,
            ingredientFailed: false,
            ingredients: mockIngredients
        };

        expect(ingredientReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_INGREDIENTS_FAILED', () => {
        const action = {
            type: GET_INGREDIENTS_FAILED
        };

        const expectedState = {
            ...initialState,
            ingredients: [],
            ingredientRequest: false,
            ingredientFailed: true
        };

        expect(ingredientReducer(initialState, action)).toEqual(expectedState);
    });
});
