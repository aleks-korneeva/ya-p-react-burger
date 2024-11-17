import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password-page.module.css";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ChangeEvent, FormEvent, useState} from "react";
import {register} from "../../services/actions/register";
import {AppRoute} from "../../utils/routes";
import {Preloader} from "../../components/preloader/preloader";

export const RegistrationPage = () => {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
    })

    const dispatch = useDispatch();
    //@ts-ignore
    const {registerRequest} = useSelector(state => state.register);

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        setState({
            ...state,
            [name]: value
        })
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // @ts-ignore
        dispatch(register(state));
    }

    return (
        <div className={styles.content_wrapper}>
            <div>
                <form onSubmit={handleSubmit} className={styles.content}>
                    <h1 className={"text text_type_main-medium"}>Регистрация</h1>
                    <Input value={state.name} onChange={handleOnChange} placeholder={"Имя"} name={"name"}></Input>
                    <EmailInput value={state.email} onChange={handleOnChange} placeholder={"E-mail"}
                                name={"email"}></EmailInput>
                    <PasswordInput value={state.password} onChange={handleOnChange} placeholder={"Пароль"}
                                   name={"password"}></PasswordInput>
                    <Button htmlType={"submit"} type={"primary"} size={"medium"}>Зарегистрироваться</Button>
                </form>
                <div className={styles.sign_in_container}>
                    <div>Уже зарегистрированы? <Link to={AppRoute.LOGIN} className={styles.link}>Войти</Link></div>
                </div>
            </div>
            {registerRequest && <Preloader text={"Регистрация..."}/>}
        </div>
    )
}