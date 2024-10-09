import React from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {BUN} from '../../utils/ingredient-types'
import OrderDetails from "./order-details/order-details";
import Modal from "../modal/modal";
import styles from './burger-constructor.module.css';
import {useDispatch, useSelector} from "react-redux";
import {CLOSE_ORDER_MODAL, createOrder, OPEN_ORDER_MODAL} from "../../services/actions/order";
import {DELETE_INGREDIENT} from "../../services/actions/constructor-ingredients";

export const BurgerConstructor = () => {
    const ingredients = useSelector(state => state.burgerConstructor.ingredients);

    const bun = React.useMemo(() => ingredients.find(e => e.type === BUN), [ingredients]);
    const mainList = React.useMemo(() => ingredients.filter(e => e.type !== BUN), [ingredients]);
    const total = React.useMemo(() => {
        if (bun) {
            return bun.price * 2 + mainList.reduce((sum, cur) => sum + cur.price, 0)
        } else return 0;
    }, [ingredients]);

    const {orderNumber, isOpen} = useSelector(state => state.order);
    const dispatch = useDispatch();


    function handleMakeOrder() {
        const ids = [bun._id, ...mainList.map(e => e._id), bun._id];
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
        return function() {
            dispatch({
                type: DELETE_INGREDIENT,
                key: key
            })
        }
    }

    return (
        <section>
            <div className="mt-25 mb-10">
                <div className={"ml-4"}>
                    { bun &&
                    <ConstructorElement text={bun.name + ' (верх)'}
                                        thumbnail={bun.image}
                                        price={bun.price}
                                        type={"top"}
                                        isLocked={true}
                                        extraClass={`${styles.constructor_element} ml-8 mb-4`}/>
                    }
                </div>
                <div className={styles.scrolled_elements_container}>
                    {mainList.map(item => (
                        <div className={`${styles.element} ml-4 mr-4`} key={item.key}>
                            <DragIcon type="primary"/>
                            <ConstructorElement text={item.name}
                                                thumbnail={item.image}
                                                price={item.price}
                                                handleClose={handleDeleteIngredient(item.key)}
                                                extraClass={`${styles.constructor_element} ml-2`}/>
                        </div>))}
                </div>
                <div className={"ml-4"}>
                    { bun &&
                    <ConstructorElement text={bun.name + ' (низ)'}
                                        thumbnail={bun.image}
                                        price={bun.price}
                                        type={"bottom"}
                                        isLocked={true}
                                        extraClass={`${styles.constructor_element} ml-8 mt-4`}/>
                    }
                </div>
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