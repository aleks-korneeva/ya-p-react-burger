import ingredientPropsTypes from "../../../utils/ingredient-props-types";
import styles from './ingredient-details.module.css'
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {ADD_INGREDIENT} from "../../../services/actions/constructor-ingredients";
import {useDispatch} from "react-redux";

export default function IngredientDetails({ingredient}) {
    const dispatch = useDispatch();

    function handleAddIngredient() {
        dispatch({
            type: ADD_INGREDIENT,
            ingredient: ingredient
        })
    }

    return (
        <div className={styles.container}>
            <img src={ingredient.image_large} alt={ingredient.name}/>
            <h1 className={"text text_type_main-medium mb-8"}>{ingredient.name}</h1>
            <div className={styles.nutrients}>
                <div className={styles.nutrient}>
                    <div>Калории, ккал</div>
                    <div className={styles.nutrient_value}>{ingredient.calories}</div>
                </div>
                <div className={styles.nutrient}>
                    <div>Белки, г</div>
                    <div className={styles.nutrient_value}>{ingredient.proteins}</div>
                </div>
                <div className={styles.nutrient}>
                    <div>Жиры, г</div>
                    <div className={styles.nutrient_value}>{ingredient.fat}</div>
                </div>
                <div className={styles.nutrient}>
                    <div>Углеводы, г</div>
                    <div className={styles.nutrient_value}>{ingredient.carbohydrates}</div>
                </div>
            </div>
            <Button htmlType="button" type="primary" size="large" onClick={handleAddIngredient}>Добавить в конструктор</Button>
        </div>
    )
}

IngredientDetails.propTypes = {
    ingredient: ingredientPropsTypes.isRequired,
}