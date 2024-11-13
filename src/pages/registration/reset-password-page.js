import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password-page.module.css";
import {useDispatch} from "react-redux";
import {setPassword} from "../../services/actions/set-password";
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {AppRoute} from "../../utils/routes";

export const ResetPasswordPage = () => {
    const [state, setState] = useState({
        password: '',
        token: ''
    })

    const {setPasswordSuccess} = useSelector(state => state.setPassword);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleOnChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        setState({
            ...state,
            [name]: value
        })
    }

    function handleSubmit() {
        dispatch(setPassword(state));
    }

    return (
        <div className={styles.content_wrapper}>
            <div className={styles.content}>
                <h1 className={"text text_type_main-medium"}>Восстановление пароля</h1>
                <form onSubmit={handleSubmit} className={styles.content}>
                    <PasswordInput value={state.password} onChange={handleOnChange}
                                   placeholder={"Введите новый пароль"}></PasswordInput>
                    <Input value={state.token} onChange={handleOnChange}
                           placeholder={"Введите код из письма"}></Input>
                    <Button htmlType={"submit"} type={"primary"} size={"medium"}>Сохранить</Button>
                </form>
                <div className={styles.sign_in_container}>
                    <div>Вспомнили пароль? <Link to={AppRoute.login} className={styles.link}>Войти</Link></div>
                </div>
            </div>
        </div>
    )
}