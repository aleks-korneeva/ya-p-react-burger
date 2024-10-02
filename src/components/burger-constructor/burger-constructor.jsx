import React from 'react';
import PropTypes from "prop-types";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import ingredientPropsTypes from "../../utils/ingredient-props-types";
import {BUN} from '../../utils/ingredient-types'
import OrderDetails from "./order-details/order-details";
import Modal from "../modal/modal";
import styles from './burger-constructor.module.css';

const BurgerConstructor = ({selectedIngredients}) => {
    const bun = React.useMemo(() => selectedIngredients.find(e => e.type === BUN), [selectedIngredients]);
    const mainList = React.useMemo(() => selectedIngredients.filter(e => e.type !== BUN), [selectedIngredients]);
    const total = React.useMemo(() => bun.price + mainList.reduce((sum, cur) => sum + cur.price, 0), [bun, mainList]);

    const [state, setState] = React.useState({isShown: false});

    function handleMakeOrder() {
        setState({isShown: true});
    }

    function handleCloseOrder() {
        setState({isShown: false});
    }

    return (
        <section>
            <div className="mt-25 mb-10">
                <div className={"ml-4"}>
                    <ConstructorElement text={bun.name + ' (верх)'}
                                        thumbnail={bun.image}
                                        price={bun.price}
                                        type={"top"}
                                        isLocked={true}
                                        extraClass={`${styles.constructor_element} ml-8 mb-4`}/>
                </div>
                <div className={styles.scrolled_elements_container}>
                    {mainList.map((item, index) => (
                        <div className={`${styles.element} ml-4 mr-4`} key={index}>
                            <DragIcon type="primary"/>
                            <ConstructorElement text={item.name}
                                                thumbnail={item.image}
                                                price={item.price}
                                                extraClass={`${styles.constructor_element} ml-2`}/>
                        </div>))}
                </div>
                <div className={"ml-4"}>
                    <ConstructorElement text={bun.name + ' (низ)'}
                                        thumbnail={bun.image}
                                        price={bun.price}
                                        type={"bottom"}
                                        isLocked={true}
                                        extraClass={`${styles.constructor_element} ml-8 mt-4`}/>
                </div>
            </div>
            <div className={`${styles.total_container} mr-8`}>
                    <span className={`${styles.total_price_container} mr-10`}>
                        <p className={"text text_type_digits-medium mr-2"}>{total}</p>
                        <CurrencyIcon type={"primary"}/>
                    </span>
                <Button htmlType="button" type="primary" size="large" onClick={handleMakeOrder}>Оформить заказ</Button>
            </div>
            {state.isShown &&
                <Modal children={<OrderDetails/>} onCloseCallback={handleCloseOrder}/>}
        </section>
    );
}

BurgerConstructor.propTypes = {
    selectedIngredients: PropTypes.arrayOf(ingredientPropsTypes.isRequired).isRequired
}

export default BurgerConstructor;