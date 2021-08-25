import closeImg from "assets/png/close.png";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Register.scss";
import RegisterNewUser from "./RegisterNewUser";
import app from "store/servises/fireBase";

const Register = () => {
    const [state, setState] = useState({
        form: true,
        email: "",
        pass: "",
        mesEmail: "",
        mesPass: "",
        labelStyleError: {},
        inputStyleError: {},
        passLabelError: {},
        passInputError: {},
    });
    const history = useHistory();

    const handleClickClose = () => {
        history.push("../");
    };

    const handleClickRegister = () => {
        setState({ form: !state.form });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        app.auth()
            .signInWithEmailAndPassword(state.email, state.pass)
            // аутентификация пользователя
            .then(() => {
                history.push("../");
            })
            .catch((error) => {
                if (error.code === "auth/user-not-found") {
                    setState({
                        form: true,
                        email: state.email,
                        pass: "",
                        mesEmail: "No registration email",
                        labelStyleError: { color: "red" },
                        inputStyleError: { border: "3px solid red" },
                    });
                } else if (error.code === "auth/wrong-password") {
                    setState({
                        form: true,
                        pass: "",
                        email: state.email,
                        mesPass: "Password error",
                        passLabelError: { color: "red" },
                        passInputError: { border: "3px solid red" },
                        inputStyleError: { border: "3px solid red" },
                    });
                } else {
                    setState({
                        form: true,
                        pass: "",
                        email: "",
                        mesPass: error.message,
                        passLabelError: { color: "red" },
                        passInputError: { border: "3px solid red" },
                        inputStyleError: { border: "3px solid red" },
                    });
                }
            });
    };

    const handleInputChange = (event) => {
        const name = event.target.name;
        setState((prevState) => ({
            ...prevState,
            [name]: event.target.value,
        }));
    };

    return (
        <section className="section-register">
            <img
                className="close"
                alt="Close"
                src={closeImg}
                onClick={handleClickClose}
                style={{ height: "40px", width: "40px" }}
            />
            {state.form && (
                <form
                    className="form_auth_style"
                    id="regform"
                    onSubmit={handleSubmit}
                >
                    <label
                        htmlFor="auth_email"
                        id="labelmail"
                        style={state.labelStyleError}
                    >
                        {state.mesEmail ? state.mesEmail : "Введите Ваш email:"}
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="@email"
                        required
                        id="auth_email"
                        onChange={handleInputChange}
                        value={state.email || ""}
                        style={state.inputStyleError}
                    />
                    <label
                        htmlFor="auth_pass"
                        id="labelinput"
                        style={state.passLabelError}
                    >
                        {state.mesPass ? state.mesPass : "Введите ваш пароль:"}
                    </label>
                    <input
                        type="password"
                        name="pass"
                        placeholder="password"
                        required
                        id="auth_pass"
                        onChange={handleInputChange}
                        value={state.pass || ""}
                        style={state.passInputError}
                    />

                    <button
                        className="form_auth_button"
                        type="submit"
                        id="auth_aut"
                    >
                        Войти
                    </button>

                    <div
                        className="form_auth_register"
                        name="form_auth_submit"
                        id="auth_reg"
                        onClick={handleClickRegister}
                    >
                        Зарегистрироваться
                    </div>
                </form>
            )}
            {!state.form && <RegisterNewUser />}
        </section>
    );
};

export default Register;
