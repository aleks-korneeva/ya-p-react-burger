import styles from "./order-info-page.module.css";
import {OrderInfo} from "../../components/order/order-info/order-info";
import {useParams} from "react-router-dom";
import {data} from "../../utils/ordersData";

export const OrderInfoPage = () => {
    const {number} = useParams();
    const order = data.orders.find(order => order.number === Number(number));

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