import "./Header.scss";
import React from "react";
import logoSite from "../../assets/svg/logo.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { usersStatus } from "../../store/actions/actions";

const Header = () => {
    const dispatch = useDispatch(); // функция захвата экшена
    const infoUser = useSelector((state) => state.stateApp.user); // авторизированный пользователь

    const siteLogo = (
        <a href="/" className="logo" title={"Домой"}>
            <img src={logoSite} alt={"logo"} />
            myMovies
        </a>
    ); // ссылка на лого
    const handleMarkCard = () => {
        dispatch(usersStatus({ name: "", status: "" }));
        localStorage.clear();
    };

    return (
        <header>
            <div className="wrap-logo">{siteLogo}</div>
            <div className="prebutton">
                <div className="innertext">
                    {infoUser.name ? infoUser.name : ""}
                </div>
                <Link to={infoUser.name ? "./" : "/register"}>
                    <button
                        className="button"
                        title="Авторизация"
                        tabIndex="0"
                        id="regbutton"
                        onClick={() => handleMarkCard()}
                    >
                        {infoUser.name ? "Exit" : "Sign In/Sign Up"}
                    </button>
                </Link>
            </div>
        </header>
    );
};
export default Header;
