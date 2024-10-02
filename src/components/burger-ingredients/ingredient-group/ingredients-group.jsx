import IngredientItem from "../ingredient-item/ingredient-item";
import PropTypes from "prop-types";
import ingredientPropsTypes from "../../../utils/ingredient-props-types";
import styles from "./ingredients-group.module.css";

export default function IngredientsGroup({title, elements, onClick}) {
    return (
        <div>
            <h2 className="text text_type_main-medium mb-6">{title}</h2>
            <div className={`${styles.ingredients_container} mb-10 pl-4 mr-4`}>
                {elements.map(el => (
                    <IngredientItem key={el._id} ingredient={el} count={1} onClickCallback={onClick}/>
                ))}
            </div>
        </div>
    );
}

IngredientsGroup.propTypes = {
    title: PropTypes.string.isRequired,
    elements: PropTypes.arrayOf(ingredientPropsTypes.isRequired).isRequired,
    onClick: PropTypes.func.isRequired
}