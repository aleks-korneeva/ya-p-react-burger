import React, {useCallback, useMemo} from 'react';
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from "./order-details/order-details";
import Modal from "../modal/modal";
import styles from './burger-constructor.module.css';
import {CLOSE_ORDER_MODAL, createOrder, OPEN_ORDER_MODAL} from "../../services/actions/create-order";
import {DELETE_ALL_INGREDIENTS, MOVE_INGREDIENT} from "../../services/actions/constructor-ingredients";
import {useDrop} from "react-dnd";
import {DraggableElement} from "./draggable-ingredient/draggable-element";
import {DraggableItemTypes} from "../../utils/draggable-item-types";
import {AppRoute} from "../../utils/routes";
import {useNavigate} from "react-router-dom";
import {Preloader} from "../preloader/preloader";
import {TIngredient, TIngredientWithKey} from "../../utils/types";
import {useDispatch, useSelector} from "../../hooks/hooks";

export const BurgerConstructor = () => {
    const {bun, ingredients} = useSelector(state => state.burgerConstructor);
    const {user} = useSelector(state => state.auth);

    const total = useMemo(() => {
        const ingredientsTotal = ingredients.reduce((sum: number, cur: TIngredientWithKey) => sum + cur.price, 0);
        return bun ? bun.price * 2 + ingredientsTotal : ingredientsTotal;
    }, [ingredients, bun]);

    const {orderNumber, isOpen, createOrderRequest} = useSelector(state => state.order);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleMakeOrder() {
        if (!user) {
            navigate(`${AppRoute.LOGIN}`);
        } else {
            if (bun) {
                const ids = [bun._id, ...ingredients.map((e: TIngredient) => e._id), bun._id];
                dispatch(createOrder(ids));
                dispatch({
                    type: OPEN_ORDER_MODAL
                })
            }
        }
    }

    function handleCloseOrder() {
        dispatch({
            type: CLOSE_ORDER_MODAL
        })
        dispatch({
            type: DELETE_ALL_INGREDIENTS
        })
    }

    const [{canDropBun, isOverBun}, bunDrop] = useDrop(() => ({
        accept: DraggableItemTypes.BUN,
        collect: (monitor) => ({
            isOverBun: monitor.isOver(),
            canDropBun: monitor.canDrop(),
        }),
    }))

    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: DraggableItemTypes.FILLING,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))

    const moveIngredient = useCallback((fromIndex: number, toIndex: number) => {
        dispatch({
            type: MOVE_INGREDIENT,
            fromIndex: fromIndex,
            toIndex: toIndex
        })
    }, [dispatch])

    return (
        <section className={styles.wrapper}>
            <div className={`mt-25 mb-10 ${styles.ingredients_container}`} ref={bunDrop}>
                {bun ? (
                    <div className={`ml-4`}>
                        <ConstructorElement text={bun.name + ' (верх)'}
                                            thumbnail={bun.image}
                                            price={bun.price}
                                            type={"top"}
                                            isLocked={true}
                                            extraClass={`${styles.constructor_element} ml-8 mb-4`}/>
                    </div>
                ) : (
                    <div
                        className={`${styles.top_bun} ${isOverBun ? styles.onHover : canDropBun ? styles.onDrop : ''}`}>
                        <span>Выберите булку</span>
                    </div>
                )
                }

                <div className={styles.scrolled_elements_container} ref={drop}>
                    {ingredients && ingredients.length > 0 ?
                        ingredients.map((item: TIngredientWithKey, index: number) => (
                            <DraggableElement item={item} index={index} moveIngredient={moveIngredient} key={item.key}/>
                           ))
                        : (
                            <div className={`${styles.empty_element} ${isOver ? styles.onHover : canDrop ? styles.onDrop : ''}`}>
                                <span>Выберите начинку</span>
                            </div>
                        )}
                </div>

                {bun ? (
                    <div className={"ml-4"}>
                        <ConstructorElement text={bun.name + ' (низ)'}
                                            thumbnail={bun.image}
                                            price={bun.price}
                                            type={"bottom"}
                                            isLocked={true}
                                            extraClass={`${styles.constructor_element} ml-8 mt-4`}/>
                    </div>
                ) : (
                    <div
                        className={`${styles.bottom_bun} ${isOverBun ? styles.onHover : canDropBun ? styles.onDrop : ''}`}>
                        <span>Выберите булку</span>
                    </div>
                )
                }
            </div>
            <div className={`${styles.total_container}`}>
                    <span className={`${styles.total_price_container} mr-10`}>
                        <p className={"text text_type_digits-medium mr-2"}>{total}</p>
                        <CurrencyIcon type={"primary"}/>
                    </span>
                <Button htmlType="button" type="primary" size="large" onClick={handleMakeOrder}>Оформить заказ</Button>
            </div>
            {createOrderRequest &&
                <Preloader text={"Оформляем заказ..."}/>
            }
            {isOpen && orderNumber &&
                <Modal children={<OrderDetails orderNumber={orderNumber}/>} onCloseCallback={handleCloseOrder}/>
            }
        </section>
    );
}