import React from "react";
import "./Footer.scss";

const Footer = () => {
    const yearNow = new Date();
    return (
        <footer>
            <div className="footer__info">
                {"© " + yearNow.getFullYear() + " Кинопортал myMovies"}
            </div>
        </footer>
    );

}
export default Footer;
