import styles from "./order-element.module.css";
import React from "react";
import {useSelector} from "../../../hooks/hooks";
import {TOrder} from "../../../utils/types";
import {IngredientImage} from "../ingredient-image/ingredient-image";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {OrderStatus, OrderStatusEnum} from "../../../utils/order-status";

type TProps = {
    order: TOrder;
    maxIconsCount?: number;
    onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
}

export function OrderElement({order, maxIconsCount = 5, onClick}: TProps) {
    const {ingredients} = useSelector(state => state.ingredients);

    function getIngredientById(id: string) {
        return ingredients.find(i => i._id === id);
    }

    function getTotalPrice() {
        return order.ingredients.map(id => getIngredientById(id))
            .reduce((sum, element) => sum + (element ? element.price : 0), 0);
    }

    return (
        <div className={styles.element_container} onClick={onClick}>
            <div className={styles.components_container}>
                <div className={"text text_type_digits-default mb-6"}>#{order.number}</div>
                <FormattedDate date={new Date(order.createdAt)} className={"text text_type_main-default text_color_inactive"}/>
            </div>
            <div className={"text text_type_main-medium mb-2"}>{order.name}</div>
            {order.status && <div className={`text text_type_main-default ${order.status === OrderStatusEnum.DONE ? "text_color_success" : ''} mb-6`}>{OrderStatus.getStatusRu(order.status)}</div>}
            <div className={styles.components_container}>
                <div className={styles.images_container}>
                    {order.ingredients.map((id, index) => {
                            if (index < maxIconsCount) {
                                const ingredient = getIngredientById(id);
                                return (
                                    ingredient &&
                                    <IngredientImage imageSource={ingredient.image_mobile}
                                                     extraClass={`${styles.image} z-index-${maxIconsCount - index}`} key={index}/>
                                )
                            }
                            if (index === maxIconsCount) {
                                const ingredient = getIngredientById(id);
                                const moreCount = order.ingredients.length - index;
                                return (
                                    ingredient &&
                                    <IngredientImage imageSource={ingredient.image_mobile}
                                                     extraClass={`${styles.image}`} text={`+${moreCount}`} key={index}/>
                                )
                            }
                            return null;
                        }
                    )}
                </div>
                <div className={styles.total_container}>
                    <span className={"text text_type_digits-default"}>{getTotalPrice()}</span>
                    <CurrencyIcon type={"primary"}></CurrencyIcon>
                </div>
            </div>
        </div>
    )
}