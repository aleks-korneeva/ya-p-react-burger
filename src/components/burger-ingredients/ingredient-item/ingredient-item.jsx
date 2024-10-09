import styles from './ingredient-item.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientPropsTypes from "../../../utils/ingredient-props-types";
import {useDispatch, useSelector} from "react-redux";
import {OPEN_INGREDIENT} from "../../../services/actions/current-ingredient";
import React from "react";
import {BUN} from "../../../utils/ingredient-types";

export default function IngredientItem({ingredient}) {
    const ingredients = useSelector(state => state.burgerConstructor.ingredients);
    const count = React.useMemo(() =>  {
        const count = ingredients.filter(e => e._id === ingredient._id).length;
        if (ingredient.type === BUN) {
            return count * 2;
        }
        return count;
    }, [ingredients]);

    const dispatch = useDispatch();

    function handleOpenModal() {
        dispatch({
            type: OPEN_INGREDIENT,
            ingredientDetails: ingredient
        })
    }

    return (
        <div className={`${styles.ingredient_container} mb-8`} onClick={handleOpenModal}>
            {count !== 0  &&
                <Counter count={count}/>
            }
            <img src={ingredient.image} alt={ingredient.name}/>
            <div className={`${styles.price_container} mt-1`}>
                <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={"text text_type_main-default mt-1"}>{ingredient.name}</p>
        </div>
    )
}

IngredientItem.propTypes = {
    ingredient: ingredientPropsTypes
}