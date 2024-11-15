import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password-page.module.css";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {resetPassword} from "../../services/actions/password-reset";
import React, {useEffect} from "react";
import {AppRoute} from "../../utils/routes";
import {Preloader} from "../../components/preloader/preloader";
import {StorageKey} from "../../utils/storage-key";

export const ForgotPasswordPage = () => {
    const [state, setState] = React.useState({
        email: ''
    });
    const {resetPasswordSuccess, resetPasswordRequest} = useSelector(state => state.passwordReset);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleOnChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        setState({
            ...state,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(resetPassword(state));
    }

    useEffect(() => {
        if (resetPasswordSuccess && localStorage.getItem(StorageKey.REDIRECT_SET_PASSWORD) === 'true') {
            navigate(AppRoute.RESET_PASSWORD, {replace: true});
        }
    }, [resetPasswordSuccess, navigate])

    return (
        <div className={styles.content_wrapper}>
            <div>
                <form onSubmit={handleSubmit} className={styles.content}>
                    <h1 className={"text text_type_main-medium"}>Восстановление пароля</h1>
                    <EmailInput value={state.email} name={"email"} onChange={handleOnChange}
                                placeholder={"Укажите e-mail"}></EmailInput>
                    <Button htmlType={"submit"} type={"primary"} size={"medium"}>Восстановить</Button>
                </form>
                <div className={styles.sign_in_container}>
                    <div>Вспомнили пароль? <Link to={AppRoute.LOGIN} className={styles.link}>Войти</Link></div>
                </div>
            </div>
            { resetPasswordRequest && <Preloader text={"Отправляем код на e-mail..."}/>}
        </div>
    )
}