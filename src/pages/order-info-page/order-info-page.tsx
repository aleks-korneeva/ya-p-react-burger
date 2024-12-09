import styles from "./order-info-page.module.css";
import {OrderInfo} from "../../components/order/order-info/order-info";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "../../hooks/hooks";
import {useEffect} from "react";
import {getOrder} from "../../services/actions/get-order";
import {Preloader} from "../../components/preloader/preloader";

export const OrderInfoPage = () => {
    const {number} = useParams();

    const order = useSelector(state => {
        let order = state.orderStatistic.statistic?.orders.find(o => o.number === Number(number));
        if (order) {
            return order;
        }

        order = state.userOrders.orders?.orders.find(o => o.number === Number(number));
        if (order) {
            return order;
        }

        return state.getOrder.orders?.length ? state.getOrder.orders[0] : null;
    })

    const dispatch = useDispatch();

    useEffect(() => {
        if (!order) {
            dispatch(getOrder(Number(number)))
        }
    }, [dispatch, number, order])

    if (!order) {
        return <Preloader/>
    }

    return (
        <div className={styles.container}>
            {order &&
                <div>
                    <h1 className={styles.title}>#{order.number}</h1>
                    <OrderInfo order={order}/>
                </div>
            }
        </div>
    )
}