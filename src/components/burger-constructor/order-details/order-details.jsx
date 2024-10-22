import styles from './order-details.module.css'
import accepted from '../../../images/order-accepted.png'
import PropTypes from "prop-types";

export default function OrderDetails({orderNumber}) {
    return (
        <div className={styles.container}>
            <p className={styles.order_number}>{orderNumber}</p>
            <p className={"text text_type_main-medium mb-15"}>идентификатор заказа</p>
            <div className={styles.order_accepted_image}>
                <img className={"mb-15"} src={accepted} alt={"заказ принят"}></img>
            </div>
            <p className={"text text_type_main-small mb-2"}>Ваш заказ начали готовить</p>
            <p className={"text text_type_main-default text_color_inactive mb-30"}>Дождитесь готовности на орбитальной
                станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    orderNumber: PropTypes.number.isRequired,
}