import styles from './ingredient-item.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientPropsTypes from "../../../utils/ingredient-props-types";
import {useDispatch, useSelector} from "react-redux";
import {OPEN_INGREDIENT} from "../../../services/actions/current-ingredient";
import React from "react";
import {BUN} from "../../../utils/ingredient-types";
import {useDrag} from "react-dnd";
import {ADD_BUN, ADD_INGREDIENT} from "../../../services/actions/constructor-ingredients";
import {DraggableItemTypes} from "../../../utils/draggable-item-types";

export default function IngredientItem({ingredient}) {
    const {bun, ingredients} = useSelector(state => state.burgerConstructor);

    const count = React.useMemo(() =>  {
        if (ingredient.type === BUN) {
            return bun && bun._id === ingredient._id ? 2 : 0;
        } else {
            return ingredients.filter(e => e._id === ingredient._id).length;
        }
    }, [bun, ingredients]);

    const dispatch = useDispatch();

    function handleOpenModal() {
        dispatch({
            type: OPEN_INGREDIENT,
            ingredientDetails: ingredient
        })
    }

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ingredient.type === BUN ? DraggableItemTypes.BUN : DraggableItemTypes.FILLING,
        item: ingredient._id,
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                ingredient.type === BUN ? dispatch({
                        type: ADD_BUN,
                        ingredient: ingredient
                    }) :
                    dispatch({
                        type: ADD_INGREDIENT,
                        ingredient: ingredient
                    })
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }))
    const opacity = isDragging ? 0.5 : 1

    return (
        <div className={`${styles.ingredient_container} mb-8`} onClick={handleOpenModal} ref={drag} style={{opacity: opacity }}>
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