import styles from "../ingredient-image/ingredient-image.module.css";
import React from "react";

type TProps = {
    imageSource?: string;
    text?: string;
    extraClass?: string;
}

export function IngredientImage({imageSource, text, extraClass}: TProps) {
    return (
        <div className={`${extraClass ? extraClass : ""}`}>
            <div className={`${styles.ingredient_image_container}`}>
                <img src={imageSource} className={styles.ingredient_image} alt={""}></img>
                {text &&
                    <div className={styles.overlay}>{text}</div>
                }
            </div>
        </div>
    )
}