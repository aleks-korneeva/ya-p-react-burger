import React, {useMemo} from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from "./order-details/order-details";
import Modal from "../modal/modal";
import styles from './burger-constructor.module.css';
import {useDispatch, useSelector} from "react-redux";
import {CLOSE_ORDER_MODAL, createOrder, OPEN_ORDER_MODAL} from "../../services/actions/order";
import {DELETE_INGREDIENT} from "../../services/actions/constructor-ingredients";
import {useDrop} from "react-dnd";
import {BUN} from "../../utils/ingredient-types";

export const BurgerConstructor = () => {
    const {bun, ingredients} = useSelector(state => state.burgerConstructor);

    const total = useMemo(() => {
        const ingredientsTotal = ingredients.reduce((sum, cur) => sum + cur.price, 0);
        return bun ? bun.price * 2 + ingredientsTotal : ingredientsTotal;
    }, [ingredients, bun]);

    const {orderNumber, isOpen} = useSelector(state => state.order);
    const dispatch = useDispatch();


    function handleMakeOrder() {
        const ids = [bun._id, ...ingredients.map(e => e._id), bun._id];
        dispatch(createOrder(ids));
        dispatch({
            type: OPEN_ORDER_MODAL
        })
    }

    function handleCloseOrder() {
        dispatch({
            type: CLOSE_ORDER_MODAL
        })
    }

    function handleDeleteIngredient(key) {
        return function () {
            dispatch({
                type: DELETE_INGREDIENT,
                key: key
            })
        }
    }

    const [{canDropBun, isOverBun}, bunDrop] = useDrop(() => ({
        accept: BUN,
        collect: (monitor) => ({
            isOverBun: monitor.isOver(),
            canDropBun: monitor.canDrop(),
        }),
    }))

    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: 'filling',
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))

    return (
        <section className={"wrapper"}>
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
                        ingredients.map(item => (
                            <div className={`${styles.element} ml-4`} key={item.key}>
                                <DragIcon type="primary"/>
                                <ConstructorElement text={item.name}
                                                    thumbnail={item.image}
                                                    price={item.price}
                                                    handleClose={handleDeleteIngredient(item.key)}
                                                    extraClass={`${styles.constructor_element} ml-2`}/>
                            </div>))
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
            <div className={`${styles.total_container} mr-8`}>
                    <span className={`${styles.total_price_container} mr-10`}>
                        <p className={"text text_type_digits-medium mr-2"}>{total}</p>
                        <CurrencyIcon type={"primary"}/>
                    </span>
                <Button htmlType="button" type="primary" size="large" onClick={handleMakeOrder}>Оформить заказ</Button>
            </div>
            {isOpen && orderNumber &&
                <Modal children={<OrderDetails orderNumber={orderNumber}/>} onCloseCallback={handleCloseOrder}/>}
        </section>
    );
}