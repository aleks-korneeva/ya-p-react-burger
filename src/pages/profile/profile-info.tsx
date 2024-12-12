import styles from "./profile-page.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { updateUser } from "../../services/actions/update-user";
import { Preloader } from "../../components/preloader/preloader";
import { useDispatch, useSelector } from "../../hooks/hooks";

export const ProfileInfo = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { updateUserRequest } = useSelector((state) => state.updateUser);
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setState({ ...state, ...user });
  }, []);

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setState({
      ...state,
      [name]: value,
    });
  }

  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(updateUser(state));
  }

  function handleReset() {
    setState({ ...state, ...user });
  }

  const hasChanges =
    state.name !== "" &&
    user &&
    (state.name !== user.name ||
      state.email !== user.email ||
      state.password !== "");

  return (
    <div>
      {user ? (
        <div>
          <form onSubmit={handleOnSubmit} className={styles.content}>
            <Input
              name={"name"}
              value={state.name}
              onChange={handleOnChange}
              placeholder={"Имя"}
              icon={"EditIcon"}
              type={"text"}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              autoComplete={"username"}
            ></Input>
            <Input
              name={"email"}
              value={state.email}
              onChange={handleOnChange}
              placeholder={"Логин"}
              icon={"EditIcon"}
              onPointerLeaveCapture={undefined}
              onPointerEnterCapture={undefined}
              autoComplete={"email"}
            ></Input>
            <Input
              name={"password"}
              value={state.password}
              onChange={handleOnChange}
              placeholder={"Пароль"}
              icon={"EditIcon"}
              type={"password"}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              autoComplete={"new-password"}
            ></Input>
            {user && hasChanges ? (
              <div className={styles.buttons}>
                <Button
                  htmlType={"button"}
                  type="secondary"
                  size={"medium"}
                  onClick={handleReset}
                >
                  Отменить
                </Button>
                <Button htmlType={"submit"} type={"primary"} size={"medium"}>
                  Сохранить
                </Button>
              </div>
            ) : (
              ""
            )}
          </form>
        </div>
      ) : (
        <Preloader />
      )}
      {updateUserRequest && <Preloader text={"Обновляем данные..."} />}
    </div>
  );
};
