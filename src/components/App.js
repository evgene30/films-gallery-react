import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Main from "./Main/Main";
import delCardPOST from "./POST/delCardPOST";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {addFilm, delFilm, newListFilms} from "../store/actions/actions";


const App = () => {
    const itemsFilm = useSelector((state) => state.stateApp.itemsFilm); // функция возврата значения из стора
    const preloader = useSelector((state) => state.stateApp.preloader); // передзагрузчик
    const user = useSelector((state) => state.stateApp.user);
    const dispatch = useDispatch(); // функция захвата объекта


    const [state, setState] = useState({
        error: null,
        filmPage: 0,
        filmId: "",
        filmCheck: false,
        checkSelect: "",
        genrisFilms: [],
        videoTrailer: new Map(),
        user: [],
    });

    useEffect(() => {
        dispatch(newListFilms());
    }, [dispatch]);

    // componentDidMount() {
    //     const filmList =
    //         "https://api.themoviedb.org/3/list/7095647?api_key=833e2dd8979208fbee927efb619ed90a&language=ru-RU"; // список фильмов
    //     const genriFilm =
    //         "https://api.themoviedb.org/3/genre/movie/list?api_key=833e2dd8979208fbee927efb619ed90a&language=ru-RU"; // список жанров
    //
    //     fetch(filmList)
    //         .then((response) => response.json())
    //         .then(
    //             (value) => {
    //                 const idFilms = value.items.map((item) => {
    //                     // формирование списка id
    //                     if (item.id === 46087) {
    //                         return 44088;
    //                     }
    //                     return item.id;
    //                 });
    //
    //                 this.setState({
    //                     preloader: true,
    //                     itemsFilm: value.items,
    //                 });
    //
    //                 idFilms.map((id) =>
    //                     fetch(
    //                         `https://api.themoviedb.org/3/movie/${id}/videos?api_key=833e2dd8979208fbee927efb619ed90a&language=ru-RU`
    //                     )
    //                         .then((response) => response.json())
    //                         .then((data) => data.results)
    //                         .then((item) => {
    //                             for (const i in item) {
    //                                 this.setState({
    //                                     videoTrailer:
    //                                         this.state.videoTrailer.set(
    //                                             id,
    //                                             item[i].key
    //                                         ),
    //                                 });
    //                             }
    //                         })
    //                 );
    //             },
    //             (error) => {
    //                 this.setState({
    //                     preloader: true,
    //                     error,
    //                 });
    //             }
    //         );
    //
    //     fetch(genriFilm)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             this.setState({
    //                 genrisFilms: data.genres,
    //             });
    //         });
    // }

    const packMassiveFilm = (array) => {
        // разбиваем исходный массив на вложенные массивы по 20 вложенных массивов
        const massiveFilmsNew = [];
        for (let i = 0; i < Math.ceil(array.length / 20); i++) {
            massiveFilmsNew[i] = array.slice(i * 20, i * 20 + 20);
        }
        return massiveFilmsNew;
    };

    const handleDeleteCard = (id) => {
        dispatch(delFilm(id));
        // удаление карточки фильма в стейте
        // const massiveFilmsNew = [...this.state.itemsFilm].filter(
        //     (el) => el.id !== id
        // );
        // this.setState({ itemsFilm: massiveFilmsNew });
        //
        // if (typeof id === "number") {
        //     return delCardPOST(id); // запрос на сервер для удаления из списка карты фильма
        // }

    };

    const handleSortFilmSelect = (count) => {
        // сортировка фильмов через Select
        const sortState = [...itemsFilm];
        setState({checkSelect: count});

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
        setState({itemsFilm: sortState});
    };

    const handleUpdatefilmPage = (object) => {
        setState({filmPage: object});
    };

    const handleUpdatefilmId = (object) => {
        setState({filmId: object});
    };

    const handleUpdatefilmCheck = (object) => {
        setState({filmCheck: object});
    };

    const handleUpdateitemsFilm = (object) => {
        dispatch(addFilm(object));

        // // функция проверки добавляемого (редактируемого) объекта фильма в общий стейт
        // const oldArray = [...state.itemsFilm];
        // if (oldArray.find((item) => item.id !== object.id)) {
        //     const newArray = oldArray.filter((item) => object.id !== item.id);
        //     newArray.unshift(object);
        //     setState({itemsFilm: newArray});
        // } else {
        //     const newArray = oldArray.map((item) => item);
        //     newArray.unshift(object);
        //     setState({itemsFilm: newArray});
        // }


    };

    const hendleVerificationUser = (userStatus, userName) => {
        // функция верификации пользователя
        setState({user: {name: userName, status: userStatus}});
    };


    const {error} = state; // используем для передачи стейт из основных фильмов (не
    // сортированных)
    const newStyle =
        user.status === "admin" ? {background: "#8080ff"} : {}; // изменение фона
    // пользователя

    if (error) {
        return (
            <div className="error-response">
                Ошибка: {error.message}
                <a href="/">
                    <div className="button-reboot">Перезагрузить</div>
                </a>
            </div>
        );
    }
    if (preloader) {
        return <div id="preloader" className="visible"/>;
    } else {
        return (
            <div
                className="App"
                style={
                    user.status === "admin"
                        ? {background: "#dae7f1"}
                        : {}
                }
            >
                <div className="container">
                    <Header
                        handleUpdatefilmCheck={handleUpdatefilmCheck} // обновляем состояние просмотра
                        hendleVerificationUser={hendleVerificationUser} // функция верификации пользователя
                        infoUser={user} // информация о зарегистрированном пользователе
                    />
                    <Main
                        handleDeleteCard={handleDeleteCard} // принимаем id фильма для удаления
                        handleSortFilmSelect={handleSortFilmSelect} // обновляем фильмы по select
                        handleUpdatefilmPage={handleUpdatefilmPage} // обновляем страницу пагинации
                        handleUpdatefilmId={handleUpdatefilmId} // обновляем id фильма
                        handleUpdatefilmCheck={handleUpdatefilmCheck} // обновляем состояние просмотра
                        listFilms={packMassiveFilm(itemsFilm)} // отправляем массив разделенных (на подмассивы)
                        // фильмов
                        hendleVerificationUser={hendleVerificationUser} // функция верификации пользователя
                        handleUpdateitemsFilm={handleUpdateitemsFilm} // обновляем массив фильмов
                        filmPage={state.filmPage} // отправляем страницу пагинации
                        filmId={state.filmId} // отправляем id фильма
                        genrisFilms={state.genrisFilms} // отправляем жанры фильма
                        filmCheck={state.filmCheck} // отправляем состояние просмотра
                        checkSelect={state.checkSelect} // отправляем состояние select
                        videoTrailer={state.videoTrailer} // отправляем ссылку на трейлер
                        itemsFilm={itemsFilm} // отправляем массив НЕ разделенных фильмов (изначальный)
                        infoUser={user} // информация о зарегистрированном пользователе
                        newStyle={newStyle} // изменение фона для пользователей
                    />
                    <Footer/>
                </div>
            </div>
        );
    }

}

export default App;
