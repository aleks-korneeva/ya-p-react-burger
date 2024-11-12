import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./registration/reset-password-page.module.css";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser, login} from "../services/actions/auth";

export const LoginPage = () => {
    const [state, setState] = useState({
        email: '',
        password: '',
    })
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    function handleOnChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        setState({
            ...state,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(login(state));
    }

    useEffect(() => {
        if (!user) {
            dispatch(getUser())
        }
    }, [])

    return (
        <div className={styles.content_wrapper}>
            <div>
                <form onSubmit={handleSubmit} className={styles.content}>
                    <h1 className={"text text_type_main-medium"}>Вход</h1>
                    <EmailInput value={state.email} onChange={handleOnChange} placeholder={"E-mail"}
                                name={"email"}></EmailInput>
                    <PasswordInput value={state.password} onChange={handleOnChange} placeholder={"Пароль"}
                                   name={"password"}></PasswordInput>
                    <Button htmlType={"submit"} type={"primary"} size={"medium"}>Войти</Button>
                </form>
                <div className={styles.sign_in_container}>
                    <div>
                        <span>Вы - новый пользователь?</span>
                        <Link to={"/register"} className={styles.link}>Зарегестрироваться</Link>
                    </div>
                    <div>Забыли пароль? <Link to={"/forgot-password"} className={styles.link}>Восстановить пароль</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}