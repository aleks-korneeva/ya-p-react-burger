import React from "react";
import styles from './ingredient-details.module.css'
import {TIngredient} from "../../../utils/types";

type TProps = {
    ingredient: TIngredient
}

export function IngredientDetails({ingredient}: TProps) {
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
        </div>
    )
}