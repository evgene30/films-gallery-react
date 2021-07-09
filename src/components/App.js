import React, {Component} from "react";
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
            // sortSelect: 'id',
        };
    }

    componentDidMount() {
        const filmList =
            "https://api.themoviedb.org/3/list/7095647?api_key=833e2dd8979208fbee927efb619ed90a&language=ru-RU";

        fetch(filmList)
            .then((response) => response.json())
            .then(
                (value) => {


                    this.setState({
                        preloader: true,
                        itemsFilm: value.items,
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


    packMassiveFilm = (array) => {

        const massiveFilmsNew = [];

        for (let i = 0; i < Math.ceil(array.length / 20); i++) {
            // разбиваем исходный массив на вложенные массивы по 20 вложенных массивов
            massiveFilmsNew[i] = array.slice(i * 20, i * 20 + 20);
        }
        return massiveFilmsNew;
    };

    handleDeleteCard = (id) => {
        // удаление карточки фильма в стейте
        const massiveFilmsNew = [...this.state.itemsFilm].filter((el) => el.id !== id);
        this.setState({itemsFilm: massiveFilmsNew});
    };

    handleSortFilmSelect = (count) => {
        const sortState = [...this.state.itemsFilm];

        switch (count) {
            case 'id':
                sortState.sort(function (a, b) {
                    return b.id - a.id;
                });
                break;
            case 'popularity':
                sortState.sort(function (a, b) {
                    return b.popularity - a.popularity;
                });
                break;
            case 'vote_average':
                sortState.sort(function (a, b) {
                    return b.vote_average - a.vote_average;
                });
                break;
            case 'vote_count':
                sortState.sort(function (a, b) {
                    return b.vote_count - a.vote_count;
                });
                break;
            case 'release_date':
                sortState.sort(function (a, b) {
                    return new Date(b.release_date) - new Date(a.release_date);
                });
                break;
            default:
                sortState.sort(function (a, b) {
                    return b.id - a.id;
                });
        }
        this.setState({itemsFilm: sortState});
    }

    render() {
        const {error, preloader, itemsFilm} = this.state;
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
            return <div id="preloader" className="visible"/>;
        } else {
            return (
                <div className="App">
                    <div className="container">
                        <Header/>
                        <Main
                            listFilms={this.packMassiveFilm(itemsFilm)}
                            handleDeleteCard={this.handleDeleteCard}
                            handleSortFilmSelect={this.handleSortFilmSelect}
                        />
                        <Footer/>
                    </div>
                </div>
            );
        }
    }
}

export default App;
