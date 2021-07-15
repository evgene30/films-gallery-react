import closeImg from "../../../assets/png/close.png";
import {useHistory} from "react-router-dom";
import {useState} from "react";
import "./Register.scss"
import RegisterNewUser from "./RegisterNewUser";
import Json from "../../../dummy_data/users.json"

const Register = (props) => {
    const messageEmail = [].join();
    const messagePass = [].join();

    const {hendleVerificationUser, handleMarkCard} = props;

    const [state, setState] = useState({
        form: true,
        email: "",
        pass: "",
    });
    const history = useHistory();

    const handleClickClose = () => {
        history.push("./");
        handleMarkCard(false);
    };

    const handleClickRegister = () => {
        setState({form: !state.form})

    }
    const handleSubmit = (event) => {
        event.preventDefault();

        Json.forEach((item) => {
            if (item.email === state.email) {
                if (item.password === state.pass) {
                    hendleVerificationUser(item.status);
                    history.push("./");
                }
                messageEmail.push("Не верный пароль");
            } else {
                messagePass.push("Не верный email")
            }
        })

    }

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setState((prevState) => ({
            ...prevState,
            [name]:
            value
        }));
    };

    return (
        <section className="section-register">
            <img
                className="close"
                alt="Close"
                src={closeImg}
                onClick={handleClickClose}
                style={{height: "40px", width: "40px"}}
            />
            {
                state.form &&
                <form className="form_auth_style" id="regform" onSubmit={handleSubmit}>
                    <label htmlFor="auth_email"
                           id="labelmail">{messageEmail ? messageEmail : "Введите Ваш email:"}</label>
                    <input type="email" name="email" placeholder="@email" required id="auth_email"
                           onChange={handleInputChange} value={state.email}/>
                    <label htmlFor="auth_pass" id="labelinput">Введите Ваш пароль:</label>
                    <input type="password" name="pass" placeholder="password" required id="auth_pass"
                           onChange={handleInputChange} value={state.pass}/>

                    <button className="form_auth_button" type="submit"
                            id="auth_aut"
                    >Войти
                    </button>

                    <div className="form_auth_register" name="form_auth_submit"
                         id="auth_reg"
                         onClick={handleClickRegister}
                    >Зарегистрироваться
                    </div>
                </form>
            }
            {
                !state.form && <RegisterNewUser/>
            }
        </section>
    )
}


export default Register;
