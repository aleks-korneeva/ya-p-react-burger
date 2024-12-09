import {OrderElement} from "../../components/order/order-element/order-element";
import styles from './profile-page.module.css'
import {useEffect} from "react";
import {wsConnect, wsDisconnect} from "../../services/actions/user-orders";
import {wsUserOrdersEndpoint} from "../../utils/api";
import {useDispatch, useSelector} from "../../hooks/hooks";
import {StorageKey} from "../../utils/storage-key";

export const ProfileOrders = () => {
    const {orders} = useSelector(state => state.userOrders);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(wsConnect(`${wsUserOrdersEndpoint}?token=${localStorage.getItem(StorageKey.ACCESS_TOKEN)?.replace("Bearer ", "")}`))
        return () => {
            dispatch(wsDisconnect())
        };
    }, [dispatch])

    return (
        <div className={styles.orders_container}>
            {orders?.orders.map((order) => (
                <OrderElement order={order} key={order.number}/>
            ))}
        </div>
    )
}