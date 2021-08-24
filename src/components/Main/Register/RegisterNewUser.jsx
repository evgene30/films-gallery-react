import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { usersStatus } from "store/actions/actions";
import app from "store/servises/fireBase";

const RegisterNewUser = () => {
    const history = useHistory();
    const dispatch = useDispatch(); // функция захвата экшена

    const [state, setState] = useState({
        name: "",
        lastname: "",
        email: "",
        pass: "",
        auth_pass: "",
        passLabelError: {},
        passInputError: {},
        mesEmail: "",
        nonCheckInput: {},
        nonCheckLabel: {},
        mesPass: "",
        status: "",
    });

    const handleInputChange = (event) => {
        setState((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleClickRegister = () => {
        setState({
            name: "",
            lastname: "",
            email: "",
            pass: "",
            auth_pass: "",
            passLabelError: {},
            passInputError: {},
            mesEmail: "",
            nonCheckInput: {},
            nonCheckLabel: {},
            mesPass: "",
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (state.pass === state.auth_pass) {
            app.auth()
                .createUserWithEmailAndPassword(state.email, state.pass) // регистрируем нового пользователя по полю email и пароль
                .then(() => {
                    const user = app.auth().currentUser; // после успешной регистрации создаем объект зарегистрированного пользователя
                    user.updateProfile({
                        displayName: state.name, // добавляем имя пользователя из формы
                        photoURL: "https://img.icons8.com/bubbles/2x/user.png", // добавляем фото пользователя из формы
                    }).then(() => {
                        dispatch(
                            usersStatus({
                                name: user.displayName,
                                status: "user",
                                avatar: user.photoURL,
                            })
                            // записываем данные в стейт
                        );
                        history.push("../"); // перенаправление на главную страницу после авторизации
                    });
                })
                .catch((error) => {
                    if (error.code === "auth/email-already-in-use") {
                        setState({
                            name: state.name,
                            email: "",
                            lastname: state.lastname,
                            pass: state.pass,
                            auth_pass: state.auth_pass,
                            passLabelError: { color: "red" },
                            passInputError: { border: "3px solid red" },
                            mesEmail: "Email is registered",
                            nonCheckInput: {},
                            nonCheckLabel: {},
                            mesPass: "",
                        });
                    }
                });
        } else {
            setState({
                name: state.name,
                email: state.email,
                lastname: state.lastname,
                pass: "",
                auth_pass: "",
                passLabelError: {},
                passInputError: {},
                mesEmail: "",
                nonCheckInput: { border: "3px solid red" },
                nonCheckLabel: { color: "red" },
                mesPass: "Password mismatch",
            });
        }
    };

    return (
        <form
            className="form_auth_style"
            id="regformtwo"
            onSubmit={handleSubmit}
        >
            <label>Введите ваше имя *</label>
            <input
                type="text"
                name="name"
                placeholder="Имя"
                required
                id="regname"
                onChange={handleInputChange}
                value={state.name || ""}
            />
            <label>Введите вашу фамилию *</label>
            <input
                type="text"
                name="lastname"
                placeholder="Фамилия"
                required
                id="reglastname"
                onChange={handleInputChange}
                value={state.lastname || ""}
            />
            <label style={state.passLabelError}>
                {state.mesEmail ? state.mesEmail : "Введите ваш email *"}
            </label>
            <input
                type="email"
                name="email"
                minLength="3"
                maxLength="20"
                placeholder="@email"
                required
                id="auth_email"
                onChange={handleInputChange}
                value={state.email || ""}
                style={state.passInputError || ""}
            />
            <label style={state.nonCheckLabel}>
                {state.mesPass ? state.mesPass : "Введите Ваш пароль *"}
            </label>
            <input
                type="password"
                name="pass"
                placeholder="password"
                required
                id="reg_pass"
                minLength="7"
                onChange={handleInputChange}
                value={state.pass || ""}
                style={state.nonCheckInput || ""}
            />
            <label>Введите Ваш пароль еще раз: *</label>
            <input
                type="password"
                name="auth_pass"
                placeholder="password"
                required
                id="reg_passtwo"
                minLength="7"
                onChange={handleInputChange}
                value={state.auth_pass || ""}
                style={state.nonCheckInput || ""}
            />
            <button
                className="form_auth_button"
                name="form_auth_submit"
                id="reg_btn"
            >
                Регистрация
            </button>
            <button
                className="form_auth_button"
                type="reset"
                onClick={handleClickRegister}
            >
                Очистить
            </button>
        </form>
    );
};

export default RegisterNewUser;
