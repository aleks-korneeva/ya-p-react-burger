import styles from "../profile-page.module.css";
import {NavLink, Outlet} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../services/actions/logout";
import {AppRoute} from "../../utils/routes";

//todo изменять текст
export const ProfilePage = () => {
    const dispatch = useDispatch();
    function handleLogout() {
        dispatch(logout())
    }

    return (
        <div className={styles.content_wrapper}>
            <div className={styles.navigation}>
                <NavLink to={""} end
                         className={({isActive}) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>
                         Профиль
                         </NavLink>
                <NavLink to={AppRoute.orders}
                         className={({isActive}) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>
                    История заказов
                </NavLink>
                <div className={styles.link} onClick={handleLogout}>Выход</div>
                <div className={"text text_type_main-small text_color_inactive mt-25"}>В этом разделе вы можете изменить свои
                    персональные данные
                </div>
            </div>
            <Outlet />
        </div>
    )
}