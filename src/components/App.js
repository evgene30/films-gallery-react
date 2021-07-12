import React, {Component} from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Main from "./Main/Main";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preloader: false,
            itemsFilm: [], // не сортированный список фильмов
            error: null,
            filmPage: 1,
            filmId: "",
            filmCheck: false,
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
        // разбиваем исходный массив на вложенные массивы по 20 вложенных массивов
        const massiveFilmsNew = [];
        for (let i = 0; i < Math.ceil(array.length / 20); i++) {
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
        // сортировка фильмов через Select
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

    handleUpdatefilmPage = (object) => {
        this.setState({filmPage: object});
    }

    handleUpdatefilmId = (object) => {
        this.setState({filmId: object});
    }

    handleUpdatefilmCheck = (object) => {
        this.setState({filmCheck: object});
    }

    handleUpdateitemsFilm = (object) => {
        // функция проверки добавляемого (редактируемого) объекта фильма в общий стейт
        const oldArray = [...this.state.itemsFilm];
        const newArray = oldArray.filter((item) => object.id !== item.id);
        newArray.unshift(object);
        this.setState({itemsFilm: newArray})
    }


    render() {
        const {error, preloader, itemsFilm} = this.state; // используем для передачи стейт из основных фильмов (не
        // сортированных)

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
                            handleDeleteCard={this.handleDeleteCard} // принимаем id фильма для удаления
                            handleSortFilmSelect={this.handleSortFilmSelect} // обновляем фильмы по select
                            handleUpdatefilmPage={this.handleUpdatefilmPage} // обновляем страницу пагинации
                            handleUpdatefilmId={this.handleUpdatefilmId} // обновляем id фильма
                            handleUpdatefilmCheck={this.handleUpdatefilmCheck} // обновляем состояние просмотра

                            listFilms={this.packMassiveFilm(itemsFilm)} // отправляем массив разделенных (на подмассивы)
                            // фильмов
                            handleUpdateitemsFilm={this.handleUpdateitemsFilm} // обновляем массив фильмов
                            filmPage={this.state.filmPage} // отправляем страницу пагинации
                            filmId={this.state.filmId} // отправляем id фильма
                            filmCheck={this.state.filmCheck} // отправляем состояние просмотра
                            itemsFilm={this.state.itemsFilm} // отправляем массив НЕ разделенных фильмов (изначальный)
                        />
                        <Footer/>
                    </div>
                </div>
            );
        }
    }
}

export default App;
