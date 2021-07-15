import React, {Component} from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Main from "./Main/Main";
import delCardPOST from "./POST/delCardPOST";



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preloader: false,
            itemsFilm: [], // не сортированный список фильмов
            error: null,
            filmPage: 0,
            filmId: "",
            filmCheck: false,
            checkSelect: "",
            genrisFilms: [],
            videoTrailer: new Map(),
        };
    }

    componentDidMount() {
        const filmList =
            "https://api.themoviedb.org/3/list/7095647?api_key=833e2dd8979208fbee927efb619ed90a&language=ru-RU"; // список фильмов
        const genriFilm =
            "https://api.themoviedb.org/3/genre/movie/list?api_key=833e2dd8979208fbee927efb619ed90a&language=ru-RU"; // список жанров

        fetch(filmList)
            .then((response) => response.json())
            .then(
                (value) => {
                    const idFilms = value.items.map((item) => {
                        // формирование списка id
                        if (item.id === 46087) {
                            return 44088;
                        }
                        return item.id;
                    });

                    this.setState({
                        preloader: true,
                        itemsFilm: value.items,
                    });

                    idFilms.map((id) =>
                        fetch(
                            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=833e2dd8979208fbee927efb619ed90a&language=ru-RU`
                        )
                            .then((response) => response.json())
                            .then((data) => data.results)
                            .then((item) => {
                                for (const i in item) {
                                    this.setState({
                                        videoTrailer:
                                            this.state.videoTrailer.set(
                                                id,
                                                item[i].key
                                            ),
                                    });
                                }
                            })
                    );
                },
                (error) => {
                    this.setState({
                        preloader: true,
                        error,
                    });
                }
            );

        fetch(genriFilm)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    genrisFilms: data.genres,
                });
            });
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
        const massiveFilmsNew = [...this.state.itemsFilm].filter(
            (el) => el.id !== id
        );
        this.setState({itemsFilm: massiveFilmsNew});

        if (typeof id === "number") {
            return (delCardPOST(id)); // запрос на сервер для удаления из списка карты фильма
        }

    };

    handleSortFilmSelect = (count) => {
        // сортировка фильмов через Select
        const sortState = [...this.state.itemsFilm];
        this.setState({checkSelect: count});

        switch (count) {
            case "id":
                sortState.sort(function (a, b) {
                    return b.id - a.id;
                });
                break;
            case "popularity":
                sortState.sort(function (a, b) {
                    return b.popularity - a.popularity;
                });
                break;
            case "vote_average":
                sortState.sort(function (a, b) {
                    return b.vote_average - a.vote_average;
                });
                break;
            case "vote_count":
                sortState.sort(function (a, b) {
                    return b.vote_count - a.vote_count;
                });
                break;
            case "release_date":
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
    };

    handleUpdatefilmPage = (object) => {
        this.setState({filmPage: object});
    };

    handleUpdatefilmId = (object) => {
        this.setState({filmId: object});
    };

    handleUpdatefilmCheck = (object) => {
        this.setState({filmCheck: object});
    };

    handleUpdateitemsFilm = (object) => {
        // функция проверки добавляемого (редактируемого) объекта фильма в общий стейт
        const oldArray = [...this.state.itemsFilm];
        if (oldArray.find((item) => item.id !== object.id)) {
            const newArray = oldArray.filter((item) => object.id !== item.id);
            newArray.unshift(object);
            this.setState({itemsFilm: newArray});
        } else {
            const newArray = oldArray.map((item) => item);
            newArray.unshift(object);
            this.setState({itemsFilm: newArray});
        }
    };

    hendleVerificationUser = (objectUser) => {
        // функция верификации пользователя
        console.log(objectUser)



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
                        <Header
                            handleUpdatefilmCheck={this.handleUpdatefilmCheck}
                        />
                        <Main
                            handleDeleteCard={this.handleDeleteCard} // принимаем id фильма для удаления
                            handleSortFilmSelect={this.handleSortFilmSelect} // обновляем фильмы по select
                            handleUpdatefilmPage={this.handleUpdatefilmPage} // обновляем страницу пагинации
                            handleUpdatefilmId={this.handleUpdatefilmId} // обновляем id фильма
                            handleUpdatefilmCheck={this.handleUpdatefilmCheck} // обновляем состояние просмотра
                            listFilms={this.packMassiveFilm(itemsFilm)} // отправляем массив разделенных (на подмассивы)
                            // фильмов
                            hendleVerificationUser={this.hendleVerificationUser} // функция верификации пользователя
                            handleUpdateitemsFilm={this.handleUpdateitemsFilm} // обновляем массив фильмов
                            filmPage={this.state.filmPage} // отправляем страницу пагинации
                            filmId={this.state.filmId} // отправляем id фильма
                            genrisFilms={this.state.genrisFilms} // отправляем жанры фильма
                            filmCheck={this.state.filmCheck} // отправляем состояние просмотра
                            checkSelect={this.state.checkSelect} // отправляем состояние select
                            videoTrailer={this.state.videoTrailer} // отправляем ссылку на трейлер
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
