import {useState} from "react";
import {useHistory} from "react-router-dom";
import Json from "../../../dummy_data/users.json";
import {useDispatch} from "react-redux";
import {usersStatus} from "../../../store/actions/actions";

const RegisterNewUser = (props) => {
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
        const emailUser = Json.find((item) => item.email === state.email);
        if (emailUser) {
            setState({
                name: state.name,
                email: "",
                lastname: state.lastname,
                pass: "",
                auth_pass: "",
                passLabelError: {color: "red"},
                passInputError: {border: "3px solid red"},
                mesEmail: "Email registered",
                nonCheckInput: {},
                nonCheckLabel: {},
                mesPass: "",
            });
        } else {
            if (state.pass === state.auth_pass) {
                dispatch(usersStatus({name: state.name, status: "user"}));
                const regUser = JSON.stringify({name: state.name, status: "user"});
                localStorage.setItem("User", regUser);
                history.push("./");
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
                    nonCheckInput: {border: "3px solid red"},
                    nonCheckLabel: {color: "red"},
                    mesPass: "Password mismatch",
                });
            }
        }
    };

    return (
        <form
            className="form_auth_style"
            id="regformtwo"
            onSubmit={handleSubmit}
        >
            <label>Введите ваше имя</label>
            <input
                type="text"
                name="name"
                placeholder="Имя"
                required
                id="regname"
                onChange={handleInputChange}
                value={state.name || ""}
            />
            <label>Введите вашу фамилию</label>
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
                {state.mesEmail ? state.mesEmail : "Введите ваш email"}
            </label>
            <input
                type="email"
                name="email"
                placeholder="@email"
                required
                id="auth_email"
                onChange={handleInputChange}
                value={state.email || ""}
                style={state.passInputError || ""}
            />
            <label style={state.nonCheckLabel}>
                {state.mesPass ? state.mesPass : "Введите Ваш пароль"}
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
            <label>Введите Ваш пароль еще раз:</label>
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
