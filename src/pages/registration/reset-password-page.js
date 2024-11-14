import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password-page.module.css";
import {useDispatch} from "react-redux";
import {setPassword} from "../../services/actions/set-password";
import {useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {AppRoute} from "../../utils/routes";
import {StorageKey} from "../../utils/storage-key";

export const ResetPasswordPage = () => {
    const [state, setState] = useState({
        password: '',
        token: ''
    })

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

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(setPassword(state));
    }

    const resetPassword = localStorage.getItem(StorageKey.PASSWORD_RESET);

    return (
        <div>
            {resetPassword ?
                <div className={styles.content_wrapper}>
                    <div>
                        <form onSubmit={handleSubmit} className={styles.content}>
                            <h1 className={"text text_type_main-medium"}>Восстановление пароля</h1>
                            <PasswordInput value={state.password} onChange={handleOnChange}
                                           placeholder={"Введите новый пароль"} name={"password"}></PasswordInput>
                            <Input value={state.token} onChange={handleOnChange}
                                   placeholder={"Введите код из письма"} name={"token"}></Input>
                            <Button htmlType={"submit"} type={"primary"} size={"medium"}>Сохранить</Button>
                        </form>
                        <div className={styles.sign_in_container}>
                        <div>Вспомнили пароль? <Link to={AppRoute.login} className={styles.link}>Войти</Link></div>
                        </div>
                    </div>
                </div> : <Navigate to={AppRoute.main}/>}
        </div>)
}