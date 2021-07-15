import "./Header.scss";
import logoSite from "../../assets/png/logo.png"
import {Link} from "react-router-dom";


const Header = (props) => {
    const siteLogo = <a href="/" className="logo" title={"Домой"}><img src={logoSite} alt={"logo"}/>myMovies</a>; // ссылка на лого
    const handleMarkCard = (check) => {
        props.handleUpdatefilmCheck(check); // убираем пагинацию
    };

    return (
        <header>
            <div className="wrap-logo">
                {siteLogo}
            </div>
            <div className="prebutton">
                <div className="innertext"/>
                <Link to="register">
                    <button
                        className="button"
                        title="Авторизация"
                        tabIndex="0" id="regbutton"
                        onClick={() => handleMarkCard(true)}
                    >
                        Sign In/Sign Up
                    </button>
                </Link>
            </div>
        </header>
    );

}
export default Header;
