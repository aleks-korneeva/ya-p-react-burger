import {OrderElement} from "../../components/order/order-element/order-element";
import styles from './profile-page.module.css'
import {data} from "../../utils/ordersData";

export const ProfileOrders = () => {
    return (
        <div className={styles.orders_container}>
            {data.orders.map((order) => (
                <OrderElement order={order} key={order.number}/>
            ))}
        </div>
    )
}