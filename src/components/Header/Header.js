import "./Header.scss";
import logoSite from "../../assets/svg/logo.svg";
import { Link } from "react-router-dom";

const Header = (props) => {
    const { handleUpdatefilmCheck, infoUser, hendleVerificationUser } = props;

    const siteLogo = (
        <a href="/" className="logo" title={"Домой"}>
            <img src={logoSite} alt={"logo"} />
            myMovies
        </a>
    ); // ссылка на лого
    const handleMarkCard = (check) => {
        handleUpdatefilmCheck(check); // убираем пагинацию
        hendleVerificationUser("", "");
    };

    return (
        <header>
            <div className="wrap-logo">{siteLogo}</div>
            <div className="prebutton">
                <div className="innertext">
                    {infoUser.name ? infoUser.name : ""}
                </div>
                <Link to={infoUser.name ? "./" : "register"}>
                    <button
                        className="button"
                        title="Авторизация"
                        tabIndex="0"
                        id="regbutton"
                        onClick={() => handleMarkCard(true)}
                    >
                        {infoUser.name ? "Exit" : "Sign In/Sign Up"}
                    </button>
                </Link>
            </div>
        </header>
    );
};
export default Header;
