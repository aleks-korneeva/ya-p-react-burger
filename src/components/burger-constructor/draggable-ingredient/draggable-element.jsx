import React, {useRef} from 'react';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './draggable-element.module.css';
import {useDispatch} from "react-redux";
import {DELETE_INGREDIENT} from "../../../services/actions/constructor-ingredients";
import {useDrag, useDrop} from "react-dnd";
import PropTypes from "prop-types";
import ingredientPropsTypes from "../../../utils/ingredient-props-types";
import {DraggableItemTypes} from "../../../utils/draggable-item-types";

export const DraggableElement = ({index, item, moveIngredient}) => {
    const dispatch = useDispatch();

    function handleDeleteIngredient(key) {
        return function () {
            dispatch({
                type: DELETE_INGREDIENT,
                key: key
            })
        }
    }

    const ref = useRef(null);

    const [{isDragging}, drag] = useDrag({
        type: DraggableItemTypes.CONSTRUCTOR_ITEM,
        item: {index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [{handlerId}, drop] = useDrop({
        accept: DraggableItemTypes.CONSTRUCTOR_ITEM,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const fromIndex = item.index
            const toIndex = index

            if (fromIndex === toIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (fromIndex < toIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (fromIndex > toIndex && hoverClientY > hoverMiddleY) {
                return
            }
            moveIngredient(fromIndex, toIndex)
            item.index = toIndex
        }
    })

    drag(drop(ref))

    return (
        <div className={`${styles.element} ${isDragging ? styles.onDrag : ''} ml-4`} key={item.key} ref={ref} data-handler-id={handlerId}>
            <DragIcon type="primary"/>
            <ConstructorElement text={item.name}
                                thumbnail={item.image}
                                price={item.price}
                                handleClose={handleDeleteIngredient(item.key)}
                                extraClass={`${styles.constructor_element} ml-2`}/>
        </div>

    );
}

DraggableElement.propsType = {
    index: PropTypes.number.isRequired,
    item: ingredientPropsTypes.isRequired,
    moveIngredient: PropTypes.func.isRequired
}