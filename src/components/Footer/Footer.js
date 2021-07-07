import React, {Component} from 'react';
import "./Footer.scss";

class Footer extends Component {

    render() {
        const yearNow = new Date();
        return (
            <footer>
                <div className="footer__info">
                    {'© ' + yearNow.getFullYear() + ' Кинопортал myMovies'}
                </div>
            </footer>
        );
    }
}

export default Footer;
