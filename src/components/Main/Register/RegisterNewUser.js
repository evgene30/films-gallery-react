const RegisterNewUser = (props) => {


    return (
        <form className="form_auth_style" action="#" method="post" id="regformtwo">
            <label>Введите ваше имя</label>
            <input type="text" name="auth_name" placeholder="Имя" required id="regname"/>
            <label>Введите вашу фамилию</label>
            <input type="text" name="auth_lastname" placeholder="Фамилия" required id="reglastname"/>
            <label>Введите ваш email</label>
            <input type="email" name="auth_email" placeholder="@email" required id="auth_email"/>
            <label>Введите Ваш пароль:</label>
            <input type="password" name="auth_pass" placeholder="password" required id="reg_pass"
                   minLength="7"/>
            <label>Введите Ваш пароль еще раз:</label>
            <input type="password" name="auth_pass" placeholder="password" required id="reg_passtwo"
                   minLength="7"/>
            <button className="form_auth_button" type="submit" name="form_auth_submit"
                    id="reg_btn">Регистрация
            </button>
            <button className="form_auth_button" type="reset">Очистить</button>
        </form>
    )
}

export default RegisterNewUser;
