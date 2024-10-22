import IngredientItem from "../ingredient-item/ingredient-item";
import PropTypes from "prop-types";
import ingredientPropsTypes from "../../../utils/ingredient-props-types";
import styles from "./ingredients-group.module.css";
import React from "react";

export const IngredientsGroup = React.forwardRef(({title, elements}, ref) =>  {
    return (
        <div>
            <h2 ref={ref} className="text text_type_main-medium mb-6">{title}</h2>
            <div className={`${styles.ingredients_container} mb-10 pl-4 mr-4`}>
                {elements.map(el => (
                    <IngredientItem key={el._id} ingredient={el}/>
                ))}
            </div>
        </div>
    );
}
)

IngredientsGroup.propTypes = {
    title: PropTypes.string.isRequired,
    elements: PropTypes.arrayOf(ingredientPropsTypes.isRequired).isRequired
}