import React, {Component} from 'react';
import "./Header.scss";
import logoSite from "../../assets/png/logo.png"

const siteLogo = <a href="/" className="logo" title={"Домой"}><img src={logoSite} alt={"logo"}/>myMovies</a>; // ссылка на лого

class Header extends Component {

    render() {
        return (
            <header>
                <div className="wrap-logo">
                    {siteLogo}
                </div>
                <div className="prebutton">
                    <div className="innertext"/>
                    <button className="button" title="Авторизация" tabIndex="0" id="regbutton">Sign In/Sign Up</button>
                </div>
            </header>
        );
    }
}

export default Header;
