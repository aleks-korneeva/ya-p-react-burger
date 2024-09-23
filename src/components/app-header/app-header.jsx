import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeader = () => {
    return (
        <header>
            <div className={styles.nav}>
                <nav className={styles.menu_container}>
                    <a href="" className={styles.menu_item}>
                        <BurgerIcon type="primary"/>
                        <p className={"text text_color_primary ml-2"}>Конструктор</p>
                    </a>

                    <a href="" className={styles.menu_item}>
                        <ListIcon type="secondary"/>
                        <p className={"text text_color_inactive ml-2"}>Лента заказов</p>
                    </a>
                </nav>

                <Logo/>
                <a href="" className={styles.menu_item}>
                    <ProfileIcon type="secondary"/>
                    <p className={"text text_color_inactive ml-2"}>Личный кабинет</p>
                </a>
            </div>
        </header>
    );
}

export default AppHeader;