import styles from "./profile-page.module.css";
import {NavLink, Outlet} from "react-router-dom";
import {logout} from "../../services/actions/logout";
import {AppRoute} from "../../utils/routes";
import {Preloader} from "../../components/preloader/preloader";
import {useDispatch, useSelector} from "../../hooks/hooks";

export const ProfilePage = () => {
    const dispatch = useDispatch();
    const {logoutRequest} = useSelector(state => state.logout);
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
                <NavLink to={AppRoute.ORDERS}
                         className={({isActive}) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>
                    История заказов
                </NavLink>
                <div className={styles.link} onClick={handleLogout}>Выход</div>
                <div className={"text text_type_main-small text_color_inactive mt-25"}>В этом разделе вы можете изменить свои
                    персональные данные
                </div>
            </div>
            <Outlet />
            { logoutRequest && <Preloader text={"Выход..."}/>}
        </div>
    )
}