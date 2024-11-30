import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password-page.module.css";
import {setPassword} from "../../services/actions/set-password";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {AppRoute} from "../../utils/routes";
import {StorageKey} from "../../utils/storage-key";
import {Preloader} from "../../components/preloader/preloader";
import {useDispatch, useSelector} from "../../hooks/hooks";

export const ResetPasswordPage = () => {
    const [state, setState] = useState({
        password: '',
        token: ''
    })

    const dispatch = useDispatch();
    const {setPasswordRequest, setPasswordSuccess} = useSelector(state => state.setPassword)

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
        dispatch(setPassword(state));
    }

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem(StorageKey.REDIRECT_SET_PASSWORD, 'false');
    }, [])

    useEffect(() => {
        const resetPassword = localStorage.getItem(StorageKey.PASSWORD_RESET);
        if (setPasswordSuccess && resetPassword === 'false') {
            navigate(AppRoute.LOGIN, {replace: true});
        }
    }, [setPasswordSuccess, navigate])

    const resetPassword = localStorage.getItem(StorageKey.PASSWORD_RESET) === 'true';

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
                                   placeholder={"Введите код из письма"} name={"token"}
                                   onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></Input>
                            <Button htmlType={"submit"} type={"primary"} size={"medium"}>Сохранить</Button>
                        </form>
                        <div className={styles.sign_in_container}>
                        <div>Вспомнили пароль? <Link to={AppRoute.LOGIN} className={styles.link}>Войти</Link></div>
                        </div>
                    </div>
                </div> : <Navigate to={AppRoute.HOME}/>}
            { setPasswordRequest && <Preloader text={"Устанавливаем новый пароль..."}/>}
        </div>)
}