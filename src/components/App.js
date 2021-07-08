import React, { Component } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Main from "./Main/Main";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preloader: false,
            itemsFilm: [],
            error: null,
        };
    }

    componentDidMount() {
        const filmList =
            "https://api.themoviedb.org/3/list/7095647?api_key=833e2dd8979208fbee927efb619ed90a&language=ru-RU";
        const sortMassiveFilm = (array) => {
            const massive = [];
            for (let i = 0; i < Math.ceil(array.length / 20); i++) {
                // разбиваем исходный массив на вложенные массивы
                // по 20 вложенных массивов
                massive[i] = array.slice(i * 20, i * 20 + 20);
            }
            return massive;
        };

        fetch(filmList)
            .then((response) => response.json())
            .then(
                (value) => {
                    this.setState({
                        preloader: true,
                        itemsFilm: sortMassiveFilm(value.items),
                    });
                },
                (error) => {
                    this.setState({
                        preloader: true,
                        error,
                    });
                }
            );
    }

    render() {
        const { error, preloader, itemsFilm } = this.state;
        if (error) {
            return (
                <div className="error-response">
                    Ошибка: {error.message}
                    <a href="/">
                        <div className="button-reboot">Перезагрузить</div>
                    </a>
                </div>
            );
        } else if (!preloader) {
            return <div id="preloader" className="visible" />;
        } else {
            return (
                <div className="App">
                    <div className="container">
                        <Header />
                        <Main listFilms={itemsFilm} />
                        <Footer />
                    </div>
                </div>
            );
        }
    }
}

export default App;
