import styles from "../profile-page.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getUser, updateUser} from "../../services/actions/auth";
import {Preloader} from "../../components/preloader";

export const ProfileInfo = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })

    useEffect(() => {
        dispatch(getUser())
    }, [])

    useEffect(() => {
        setState({...state, ...user})
    }, [user]);

    function handleOnChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        setState({
            ...state,
            [name]: value
        })
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        dispatch(updateUser(state));
    }

    function handleReset(e) {
        setState({...state, ...user})
    }

    const hasChanges = state.name !== '' && (state.name !== user.name || state.email !== user.email || state.password !== '');

    return (
        <div className={styles.content}>
            {user ? <div>
                    <form onSubmit={handleOnSubmit}>
                        <Input name={"name"} value={state.name} onChange={handleOnChange} placeholder={"Имя"}
                               icon={"EditIcon"} type={"text"}></Input>
                        <Input name={"email"} value={state.email} onChange={handleOnChange} placeholder={"Логин"}
                               icon={"EditIcon"}
                               onIconClick={e => e}></Input>
                        <Input name={"password"} value={state.password} onChange={handleOnChange} placeholder={"Пароль"}
                               icon={"EditIcon"}
                               type={"password"}
                               onIconClick={e => e}></Input>
                        {user && hasChanges ? <div>
                            <Button htmlType={"submit"} type={"primary"} size={"medium"}>Сохранить</Button>
                            <Button htmlType={"button"} type={"primary"} size={"medium"} onClick={handleReset}>Отменить</Button>
                        </div> : ''}
                    </form>
                </div>
                : <Preloader/>}
        </div>
    )
}