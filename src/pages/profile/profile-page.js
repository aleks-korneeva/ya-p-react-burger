import styles from "../profile-page.module.css";
import {NavLink, Outlet} from "react-router-dom";

//todo изменять текст
export const ProfilePage = () => {
    return (
        <div className={styles.content_wrapper}>
            <div className={styles.navigation}>
                <NavLink to={""} end
                         className={({isActive}) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>
                         Профиль
                         </NavLink>
                <NavLink to={"orders"}
                         className={({isActive}) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>
                    История заказов
                </NavLink>
                <NavLink to={"logout"} className={styles.link}>Выход</NavLink>
                <div className={"text text_type_main-small text_color_inactive mt-25"}>В этом разделе вы можете изменить свои
                    персональные данные
                </div>
            </div>
            <Outlet />
        </div>
    )
}