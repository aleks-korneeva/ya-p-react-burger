import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../registration/reset-password-page.module.css";
import {Link} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../services/actions/login";
import {AppRoute} from "../../utils/routes";
import {Preloader} from "../../components/preloader/preloader";

export const LoginPage = () => {
    const [state, setState] = useState({
        email: '',
        password: '',
    })

    const dispatch = useDispatch();
    //@ts-ignore
    const {loginRequest} = useSelector(state => state.login)

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        setState({
            ...state,
            [name]: value
        });
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        //@ts-ignore
        dispatch(login(state));
    }

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
                        <span className={"mr-2"}>Вы - новый пользователь?</span>
                        <Link to={AppRoute.REGISTER} className={styles.link}>Зарегестрироваться</Link>
                    </div>
                    <div>Забыли пароль? <Link to={AppRoute.FORGOT_PASSWORD} className={styles.link}>Восстановить пароль</Link>
                    </div>
                </div>
            </div>
            { loginRequest && <Preloader text={"Вход..."}/>}
        </div>
    )
}