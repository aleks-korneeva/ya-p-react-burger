import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password-page.module.css";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {resetPassword} from "../../services/actions/password-reset";
import React, {useEffect} from "react";
import {AppRoute} from "../../utils/routes";

export const ForgotPasswordPage = () => {
    const [value, setValue] = React.useState('');
    const {resetPasswordSuccess} = useSelector(state => state.passwordReset);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(resetPassword(value));
    }

    useEffect(() => {
        if (resetPasswordSuccess) {
            navigate(AppRoute.resetPassword, {replace: true});
        }
    }, [resetPasswordSuccess, navigate])

    return (
        <div className={styles.content_wrapper}>
            <div>
                <form onSubmit={handleSubmit} className={styles.content}>
                    <h1 className={"text text_type_main-medium"}>Восстановление пароля</h1>
                    <EmailInput value={value} onChange={e => setValue(e.target.value)}
                                placeholder={"Укажите e-mail"}></EmailInput>
                    <Button htmlType={"submit"} type={"primary"} size={"medium"}>Восстановить</Button>
                </form>
                <div className={styles.sign_in_container}>
                    <div>Вспомнили пароль? <Link to={AppRoute.login} className={styles.link}>Войти</Link></div>
                </div>
            </div>
        </div>
    )
}