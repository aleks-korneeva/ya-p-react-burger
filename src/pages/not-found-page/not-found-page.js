import styles from './not-found-page.module.css';
import {Link} from "react-router-dom";
import {AppRoute} from "../../utils/routes";

export const NotFoundPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={"text text_type_main-large mb-5"}>404</h1>
            <div className={"text text_type_main-medium"}>Страница не найдена</div>
            <Link to={AppRoute.HOME} className={"text text_type_main-default mt-5 link"}>Вернуться на главную</Link>
        </div>
    )
}