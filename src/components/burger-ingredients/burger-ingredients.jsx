import React from "react";
import PropTypes from "prop-types";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'
import IngredientsGroup from "./ingredient-group/ingredients-group";
import ingredientPropsTypes from "../../utils/ingredient-props-types";

const INGREDIENT_TYPE_BUN = 'bun';
const INGREDIENT_TYPE_SAUCE = 'sauce';
const INGREDIENT_TYPE_MAIN = 'main';

const BurgerIngredients = ({ingredients}) => {
    return (
        <section>
            <h1 className={"text text_type_main-large mt-10 mb-5"}>Соберите бургер</h1>
            <div className={`${styles.tab_container}`}>
                <Tab value={INGREDIENT_TYPE_BUN} active={true} onClick={onClick}>
                    Булки
                </Tab>
                <Tab value={INGREDIENT_TYPE_SAUCE} active={false} onClick={onClick}>
                    Соусы
                </Tab>
                <Tab value={INGREDIENT_TYPE_MAIN} active={false} onClick={onClick}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.ingredients_container}>
                <IngredientsGroup title="Булки" elements={getIngredientsByType(INGREDIENT_TYPE_BUN)}
                                  key={INGREDIENT_TYPE_BUN}/>
                <IngredientsGroup title="Соусы" elements={getIngredientsByType(INGREDIENT_TYPE_SAUCE)}
                                  key={INGREDIENT_TYPE_SAUCE}/>
                <IngredientsGroup title="Начинки" elements={getIngredientsByType(INGREDIENT_TYPE_MAIN)}
                                  key={INGREDIENT_TYPE_MAIN}/>
            </div>
        </section>
    )

    function getIngredientsByType(type) {
        return ingredients.filter(e => e.type === type);
    }
}

const onClick = () => {}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropsTypes)
}

export default BurgerIngredients;