import "./Header.scss";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { usersStatus } from "../../store/actions/actions";
import {ReactComponent as LogoSVG} from "../../../src/assets/svg/logo.svg";

const Header = () => {
    const dispatch = useDispatch(); // функция захвата экшена
    const infoUser = useSelector((state) => state.stateApp.user); // авторизированный пользователь

    const siteLogo = (
        <a href="/" className="link_logo" title={"Домой"}>
            <LogoSVG style={{color: "white"}} className="logo"/>
            <p>myMovies</p>
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
                    {infoUser?.name}
                </div>
                <Link to={infoUser.name ? "../" : "/register"}>
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
