import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import {NavLink} from "react-router-dom";
import {AppRoute} from "../../utils/routes";

const AppHeader = () => {
    return (
        <header>
            <div className={styles.nav}>
                <nav className={styles.menu_container}>
                    <NavLink to={AppRoute.main} className={({isActive}) => isActive ? `${styles.menu_item} active-link` : `${styles.menu_item} text_color_inactive`}>
                        {({isActive}) => (
                            <>
                                <BurgerIcon type={isActive ? "primary" : "secondary"} />
                                <p className={"text ml-2"}>Конструктор</p>
                            </>
                        )}
                    </NavLink>

                    <NavLink to="/orders" className={({isActive}) => isActive ? `${styles.menu_item} active-link` : `${styles.menu_item} text_color_inactive`}>
                        {({isActive}) => (
                            <>
                                <ListIcon type={isActive ? "primary" : "secondary"} />
                                <p className={"text ml-2"}>Лента заказов</p>
                            </>
                        )}
                    </NavLink>
                </nav>
                <Logo/>
                <NavLink to={AppRoute.profile} className={({isActive}) => isActive ? `${styles.menu_item} active-link` : `${styles.menu_item} text_color_inactive`}>
                    {({isActive}) => (
                        <>
                            <ProfileIcon type={isActive ? "primary" : "secondary"} />
                            <p className={"text ml-2"}>Личный кабинет</p>
                        </>
                    )}
                </NavLink>
            </div>
        </header>
    );
}

export default AppHeader;