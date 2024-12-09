import React from "react";
import styles from './order-info.module.css'
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientImage} from "../ingredient-image/ingredient-image";
import {useSelector} from "../../../hooks/hooks";
import {TOrder} from "../../../utils/types";
import {OrderStatus, OrderStatusEnum} from "../../../utils/order-status";

type TProps = {
    order: TOrder
}

export function OrderInfo({order}: TProps) {
    const {ingredients} = useSelector(state => state.ingredients);

    function getIngredientById(id: string) {
       return ingredients.find(i => i._id === id);
    }

    function countIngredientById(id: string) {
        return ingredients.filter(i => i._id === id).length;
    }

    function getTotalPrice() {
        return order.ingredients.map(id => getIngredientById(id))
            .reduce((sum, element) => sum + (element ? element.price : 0), 0);
    }

    return (
        <div className={styles.container}>
            <h1 className={"text text_type_main-medium mb-3"}>{order.name}</h1>
            <div className={`text text_type_main-default ${order.status === OrderStatusEnum.DONE ? "text_color_success" : ''} mb-15`}>{OrderStatus.getStatusRu(order.status)}</div>
            <div className={"text text_type_main-medium mb-6"}>Состав:</div>
            <div className={styles.order_components}>
                {order.ingredients.map((id, index) => {
                    const ingredient = getIngredientById(id);
                    if (!ingredient) {
                        return null;
                    }
                        return (
                            <div className={styles.component_container} key={index}>
                                <IngredientImage imageSource={ingredient.image}/>
                                <div className={styles.ingredient_name}>{ingredient.name}</div>
                                <div className={styles.total_container}>
                                <span
                                    className={"text text_type_digits-default"}>{countIngredientById(id)} x {ingredient.price}</span>
                                    <CurrencyIcon type={"primary"}></CurrencyIcon>
                                </div>
                            </div>
                        )
                    }
                )}
            </div>
            <div className={styles.summary_container}>
                <FormattedDate date={new Date(order.createdAt)} className={"text text_type_main-default text_color_inactive"}/>
                <div className={styles.total_container}>
                    <span className={"text text_type_digits-default"}>{getTotalPrice()}</span>
                    <CurrencyIcon type={"primary"}/>
                </div>
            </div>
        </div>
    )
}