import PropTypes from "prop-types";
import styles from './ingredient-item.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientPropsTypes from "../../../utils/ingredient-props-types";

export default function IngredientItem({ingredient, count, onClickCallback}) {

    function handleOpenModal(e) {
        onClickCallback(ingredient);
        e.stopPropagation();
    }

    return (
        <div className={`${styles.ingredient_container} mb-8`} onClick={handleOpenModal}>
            <Counter count={count}/>
            <img src={ingredient.image} alt={ingredient.name} />
            <div className={`${styles.price_container} mt-1`}>
                <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={"text text_type_main-default mt-1"}>{ingredient.name}</p>
        </div>
    )
}

IngredientItem.propTypes = {
    ingredient: ingredientPropsTypes,
    count: PropTypes.number
}