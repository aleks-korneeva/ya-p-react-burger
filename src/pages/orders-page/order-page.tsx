import {OrderElement} from "../../components/order/order-element/order-element";
import styles from './order-page.module.css'
import {OrderStatus} from "../../utils/order-status";
import {useEffect} from "react";
import {useDispatch, useSelector} from "../../hooks/hooks";
import {wsConnect, wsDisconnect} from "../../services/actions/order-statistic";
import {Preloader} from "../../components/preloader/preloader";
import {wsAllOrdersEndpoint} from "../../utils/api";
import {WebsocketStatus} from "../../utils/web-socket-status";

export function OrderPage() {
    const dispatch = useDispatch();

    const {statistic, status} = useSelector(state => state.orderStatistic);

    useEffect(() => {
        dispatch(wsConnect(wsAllOrdersEndpoint))
        return () => {
            dispatch(wsDisconnect())
        };
    }, [dispatch])

    function getOrdersWithStatus(status: string) {
        return statistic ? statistic.orders.filter(o => o.status === status).slice(0, 10) : [];
    }

    return status === WebsocketStatus.ONLINE && statistic ? (
            <div className={"content_wrapper mt-10"}>

                <div className={styles.container_element}>
                    <h1 className={"text text_type_main-large mb-4"}>Лента заказов</h1>
                    <div className={styles.orders_container}>
                        {statistic && statistic.orders.map((order, index) => (
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
                                    return <div className={"text text_type_digits-default text_color_success"}
                                                key={order.number}>{order.number}</div>
                                })}
                            </div>
                        </div>
                        <div className={`text text_type_main-medium ${styles.container_element}`}>
                            <div className={"mb-6"}>В работе:</div>
                            <div className={styles.orders_number_container}>
                                {getOrdersWithStatus(OrderStatus.IN_PROGRESS.name).map(order => {
                                    return <div className={"text text_type_digits-default"}
                                                key={order.number}>{order.number}</div>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={"mb-15"}>
                        <div className={"text text_type_main-medium"}>Выполнено за все время:</div>
                        <div className={"text text_type_digits-large text_shadow"}>{statistic?.total}</div>
                    </div>
                    <div>
                        <div className={"text text_type_main-medium"}>Выполнено за сегодня:</div>
                        <div className={"text text_type_digits-large text_shadow"}>{statistic?.totalToday}</div>
                    </div>
                </div>

            </div>) :
        <Preloader/>
}