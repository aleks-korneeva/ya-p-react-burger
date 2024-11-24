import {IngredientItem} from "../ingredient-item/ingredient-item";
import styles from "./ingredients-group.module.css";
import React from "react";
import {TIngredient} from "../../../utils/types";

type TProps = {
    title: string,
    elements: TIngredient[]
}

export const IngredientsGroup = React.forwardRef<HTMLHeadingElement, TProps>(({title, elements}, ref) => {
        return (
            <div>
                <h2 ref={ref} className="text text_type_main-medium mb-6">{title}</h2>
                <div className={`${styles.ingredients_container} mb-10 pl-4 mr-4`}>
                    {elements.map((el: TIngredient) => (
                        <IngredientItem key={el._id} ingredient={el}/>
                    ))}
                </div>
            </div>
        );
    }
)