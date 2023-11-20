import React, { useContext } from "react";
import { MyInput } from "../components/ui/input/MyInput";
import { MyButton } from "../components/ui/button/MyButton";
import { AuthContext } from "../context";

export const Login = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  console.log(isAuth);
  const login = (event) => {
    event.preventDefault();
    setIsAuth(true);
    localStorage.setItem("auth", "true");
  };
  return (
    <div>
      <h1>Страница для регистрации пользователя</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder="Введитен логин" />
        <MyInput type="password" placeholder="Введитен пароль" />
        <MyButton>Войти</MyButton>
        <p>чотбы увидеть список постов, достаточно нажать на Войти</p>
      </form>
    </div>
  );
};
