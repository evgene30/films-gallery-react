import "./Header.scss";
import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {usersStatus} from "store/actions/actions";
import {ReactComponent as LogoSVG} from "assets/svg/logo.svg";
import app from "store/servises/fireBase";


const Header = () => {
    const dispatch = useDispatch(); // функция захвата экшена
    const infoUser = useSelector((state) => state.stateApp.user); // авторизированный пользователь

    const siteLogo = (
        <a href="/" className="link_logo" title={"Домой"}>
            <LogoSVG style={{color: "white"}} className="logo"/>
            <p>myMovies</p>
        </a>
    ); // ссылка на лого
    const handleMarkCard = async () => {
        dispatch(usersStatus(''));
        await app.auth().signOut() // выход
    };

    return (
        <header>
            <div className="wrap-logo">{siteLogo}</div>
            <div className="prebutton">
                <div className="innertext">
                    {infoUser?.name}
                    {infoUser.avatar && <div className="userAvatar"><img className="userAvatarImage" src={infoUser.avatar} alt="user avatar"/></div>}
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
