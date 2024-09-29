import React from "react";
import PropTypes from "prop-types";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'
import IngredientsGroup from "./ingredient-group/ingredients-group";
import ingredientPropsTypes from "../../utils/ingredient-props-types";
import Modal from "../modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";
import {BUN, MAIN, SAUCE} from '../../utils/ingredient-types';

export default function BurgerIngredients({ingredients}) {
    const [state, setState] = React.useState({visible: false, ingredient: null})

    function handleClick(ingredient) {
        setState({...state, visible: true, ingredient: ingredient});
    }

    function handleClose(e) {
        setState({...state, visible: false, ingredient: null});
        e.stopPropagation();
    }

    function getIngredientsByType(type) {
        return ingredients.filter(e => e.type === type);
    }

    return (
        <section style={{flexBasis: 800}}>
            <h1 className={"text text_type_main-large mt-10 mb-5"}>Соберите бургер</h1>
            <div className={`${styles.tab_container}`}>
                <Tab value={BUN} active={true} onClick={onClick}>
                    Булки
                </Tab>
                <Tab value={SAUCE} active={false} onClick={onClick}>
                    Соусы
                </Tab>
                <Tab value={MAIN} active={false} onClick={onClick}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.ingredients_container}>
                <IngredientsGroup title="Булки" elements={getIngredientsByType(BUN)}
                                  key={BUN} onClick={handleClick}/>
                <IngredientsGroup title="Соусы" elements={getIngredientsByType(SAUCE)}
                                  key={SAUCE} onClick={handleClick}/>
                <IngredientsGroup title="Начинки" elements={getIngredientsByType(MAIN)}
                                  key={MAIN} onClick={handleClick}/>
            </div>
            {state.visible &&
                <Modal title={"Детали ингредиента"} children={<IngredientDetails ingredient={state.ingredient}/>} onCloseCallback={handleClose}/>
            }
        </section>
    )
}

const onClick = () => {
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropsTypes.isRequired)
}
