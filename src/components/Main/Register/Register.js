import closeImg from "../../../assets/png/close.png";
import {useHistory} from "react-router-dom";
import "./Register.scss"

const Register = (props) => {
    const history = useHistory();

    const handleClickClose = () => {
        history.push("./");
        props.handleMarkCard(false);
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

            <form className="form_auth_style" action="#" method="post" id="regform">
                <label htmlFor="auth_email" id="labelmail">Введите Ваш имейл:</label>
                <input type="email" name="auth_email" placeholder="@email" required id="auth_email"/>
                <label htmlFor="auth_pass" id="labelinput">Введите Ваш пароль:</label>
                <input type="password" name="auth_pass" placeholder="password" required id="auth_pass"/>

                <button className="form_auth_button" type="submit" name="form_auth_submit"
                        id="auth_aut">Войти
                </button>

                <div className="form_auth_register" name="form_auth_submit"
                     id="auth_reg">Зарегистрироваться
                </div>

            </form>


        </section>
    )
}


export default Register;
