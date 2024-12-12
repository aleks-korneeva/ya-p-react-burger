import React, {useRef} from 'react';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './draggable-element.module.css';
import {DELETE_INGREDIENT} from "../../../services/actions/constructor-ingredients";
import {useDrag, useDrop} from "react-dnd";
import {DraggableItemTypes} from "../../../utils/draggable-item-types";
import {TIngredientWithKey} from "../../../utils/types";
import type {Identifier} from "dnd-core";
import {useDispatch} from "../../../hooks/hooks";

type TProps = {
    index: number;
    item: TIngredientWithKey;
    moveIngredient: (fromIndex: number, toIndex: number) => void;
}

type TDragObject = {
    index: number;
}

type TDragCollectedProps = {
    isDragging: boolean
}

type TDropCollectedProps = {
    handlerId: Identifier | null
}

export const DraggableElement = ({index, item, moveIngredient}: TProps): React.JSX.Element => {
    const dispatch = useDispatch();

    function handleDeleteIngredient(key: string) {
        return function () {
            dispatch({
                type: DELETE_INGREDIENT,
                key: key
            })
        }
    }

    const ref = useRef<HTMLDivElement>(null);

    const [{isDragging}, drag] = useDrag<TDragObject, unknown, TDragCollectedProps>({
        type: DraggableItemTypes.CONSTRUCTOR_ITEM,
        item: {index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [{handlerId}, drop] = useDrop<TDragObject, unknown, TDropCollectedProps>({
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
            if (!clientOffset) {
                return;
            }
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