import {OrderElement} from "../../components/order/order-element/order-element";
import styles from './order-page.module.css'
import {data} from "../../utils/ordersData";
import {OrderStatus} from "../../utils/order-status";

export function OrderPage() {

    function getOrdersWithStatus(status: string) {
        return data.orders.filter(o => o.status === status).slice(0, 10);
    }

    return (
        <div className={"content_wrapper mt-10"}>
            <div className={styles.container_element}>
                <h1 className={"text text_type_main-large mb-4"}>Лента заказов</h1>
                <div className={styles.orders_container}>
                    {data.orders.map((order, index) => (
                        <OrderElement order={order} key={index}/>
                    ))}
                </div>
            </div>
            <div className={styles.container_element}>
                <div className={`${styles.flex_container} mb-15`}>
                    <div className={`text text_type_main-medium ${styles.container_element}`}>
                        <div className={"mb-6"}>Готовы:</div>
                        <div className={styles.orders_number_container}>
                            {getOrdersWithStatus(OrderStatus.DONE.name).map(order => {
                                return <div className={"text text_type_digits-default text_color_success"} key={order.number}>{order.number}</div>
                            })}
                        </div>
                    </div>
                    <div className={`text text_type_main-medium ${styles.container_element}`}>
                        <div className={"mb-6"}>В работе:</div>
                        <div className={styles.orders_number_container}>
                            {getOrdersWithStatus(OrderStatus.IN_PROGRESS.name).map(order => {
                                return <div className={"text text_type_digits-default"} key={order.number}>{order.number}</div>
                            })}
                        </div>
                    </div>
                </div>
                <div className={"mb-15"}>
                    <div className={"text text_type_main-medium"}>Выполнено за все время:</div>
                    <div className={"text text_type_digits-large text_shadow"}>{data.total}</div>
                </div>
                <div>
                    <div className={"text text_type_main-medium"}>Выполнено за сегодня:</div>
                    <div className={"text text_type_digits-large text_shadow"}>{data.totalToday}</div>
                </div>
            </div>
        </div>
    )
}