import {burgerConstructorReducer, initialState} from "../../../services/reducers/constructor-ingredients";
import {
    ADD_BUN,
    ADD_INGREDIENT,
    DELETE_ALL_INGREDIENTS,
    DELETE_INGREDIENT, MOVE_INGREDIENT
} from "../../../services/actions/constructor-ingredients";

describe('burgerConstructor reducer test', () => {
    const firstIngredient = {
        _id: '1',
        name: 'ingredient 1',
        key: '1'
    }

    const secondIngredient = {
        _id: '2',
        name: 'ingredient 2',
        key: '2'
    }

    const state = {
        ...initialState,
        ingredients: [
            firstIngredient,
            secondIngredient
        ]
    }

    it('should return initial state', () => {
        expect(burgerConstructorReducer(undefined, {type: ''})).toEqual(initialState)
    })

    it ('should handle ADD_INGREDIENT', () => {
        const action = {
            type: ADD_INGREDIENT,
            ingredient: firstIngredient
        }

        const expectedState = {
            ...initialState,
            ingredients: [
                ...initialState.ingredients,
                firstIngredient
            ]
        }

        expect(burgerConstructorReducer(initialState, action)).toEqual(expectedState);
    })

    it('should handle ADD_BUN', () => {
        const action = {
            type: ADD_BUN,
            ingredient: firstIngredient
        }

        const expectedState = {
            ...initialState,
            bun: firstIngredient
        }

        expect(burgerConstructorReducer(initialState, action)).toEqual(expectedState);
    })

    it('should handle DELETE_INGREDIENT', () => {
        const action = {
            type: DELETE_INGREDIENT,
            key: firstIngredient.key
        }

        const expectedState = {
            ...initialState,
            ingredients: [
                secondIngredient
            ]
        }

        expect(burgerConstructorReducer(state, action)).toEqual(expectedState);
    })

    it('should handle DELETE_ALL_INGREDIENTS', () => {
        const action = {
            type: DELETE_ALL_INGREDIENTS
        }

        const expectedState = {
            ...initialState,
            ingredients: []
        }

        expect(burgerConstructorReducer(state, action)).toEqual(expectedState);
    })

    it('should handle MOVE_INGREDIENT', () => {
        const action = {
            type: MOVE_INGREDIENT,
            toIndex: 1,
            fromIndex: 0,
        }

        const expectedState = {
            ...initialState,
            ingredients: [
                secondIngredient,
                firstIngredient
            ]
        }

        expect(burgerConstructorReducer(state, action)).toEqual(expectedState);
    })
})