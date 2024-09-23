import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css';
import PropTypes from "prop-types";
import ingredientPropsTypes from "../../utils/ingredient-props-types";

const BurgerConstructor = ({selectedIngredients}) => {
    const bun = selectedIngredients.find(e => e.type === 'bun');
    const main = selectedIngredients.filter(e => e.type !== 'bun');
    const total = bun.price + main.reduce((sum, cur) => sum + cur.price, 0);
    return (
        <section>
            <div className="mt-25 mb-10">
                <div className={"ml-4"}>
                    <ConstructorElement text={bun.name}
                                        thumbnail={bun.image}
                                        price={bun.price}
                                        type={"top"}
                                        isLocked={true}
                                        extraClass={`${styles.constructor_element} ml-8 mb-4`}/>
                </div>
                <div className={styles.scrolled_elements_container}>
                    {main.map((item, index) => (
                        <div className={`${styles.element} ml-4 mr-4`} key={index}>
                            <DragIcon type="primary"/>
                            <ConstructorElement text={item.name}
                                                thumbnail={item.image}
                                                price={item.price}
                                                extraClass={`${styles.constructor_element} ml-2`}/>
                        </div>))}
                </div>
                <div className={"ml-4"}>
                    <ConstructorElement text={bun.name}
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
                <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    selectedIngredients: PropTypes.arrayOf(ingredientPropsTypes)
}

export default BurgerConstructor;