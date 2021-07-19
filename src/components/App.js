import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Main from "./Main/Main";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {selectFilms} from "./Main/Select/selectFilms";
import {newFilms} from "./Main/Addfilm/addNewFilm";
import {addFilm, delFilm, newListFilms, genrisFilms, filmID, selectFilter, filmChecks, usersStatus} from "../store/actions/actions";


const App = () => {
    const dispatch = useDispatch(); // функция захвата объекта
    const itemsFilm = useSelector((state) => state.stateApp.itemsFilm); // списк всех фильмов
    const preloader = useSelector((state) => state.stateApp.preloader); // передзагрузчик
    const user = useSelector((state) => state.stateApp.user); // авторизированный пользователь
    const errors = useSelector((state) => state.stateApp.error); // отлов ошибок промиса
    const genrisFilm = useSelector((state) => state.stateApp.genrisFilms); // жанры фильмов
    const filmId = useSelector((state) => state.stateApp.filmId); // ID выбранного фильма
    const filmCheck = useSelector((state) => state.stateApp.filmCheck); // убираем блок пагинации при клике
    const checkSelect = useSelector((state) => state.stateApp.checkSelect); // трейлеры фильмов
    const filmPages = useSelector((state) => state.stateApp.filmPage); // отправляем страницу пагинации
    const newStyle = user.status === "admin" ? {background: "#8080ff"} : {}; // изменение фона для Админа

    useEffect(() => {
            dispatch(newListFilms()); // загружаем список фильмов
            dispatch(genrisFilms()); // загружаем жанры
        },
        [dispatch]);


    const packMassiveFilm = (array) => {
        // разбиваем исходный массив на вложенные массивы по 20 вложенных массивов для пагинации
        const massiveFilmsNew = [];
        for (let i = 0; i < Math.ceil(array.length / 20); i++) {
            massiveFilmsNew[i] = array.slice(i * 20, i * 20 + 20);
        }
        return massiveFilmsNew;
    };

    const handleDeleteCard = (id) => {
        // удаление карточки фильма
        dispatch(delFilm(id));
    };

    const handleSortFilmSelect = (count) => {
        // сортировка фильмов через Select
        dispatch(selectFilter(count)) // записываем выбранный параметр в стейт
        dispatch(addFilm(selectFilms(count, itemsFilm))) // обработка логики сортировки перед записью в стейт
    };


    const handleUpdatefilmId = (object) => {
        dispatch(filmID(object))
    };

    const handleUpdatefilmCheck = (object) => {
        dispatch(filmChecks(object))
    };

    const handleUpdateitemsFilm = (object) => {
        dispatch(addFilm(newFilms(object, itemsFilm))); // обработка логики добавления/изменения фильма

    };

    const hendleVerificationUser = (userStatus, userName) => {
        // функция верификации пользователя
        dispatch(usersStatus({name: userName, status: userStatus}));
    };

    if (errors) {
        return (
            <div className="error-response">
                Ошибка: {errors.message}
                <a href="/">
                    <div className="button-reboot">Перезагрузить</div>
                </a>
            </div>
        );
    } else if (preloader) {
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
                        handleUpdatefilmId={handleUpdatefilmId} // обновляем id фильма
                        handleUpdatefilmCheck={handleUpdatefilmCheck} // обновляем состояние просмотра
                        listFilms={packMassiveFilm(itemsFilm)} // отправляем массив разделенных (на подмассивы)
                        // фильмов
                        hendleVerificationUser={hendleVerificationUser} // функция верификации пользователя
                        handleUpdateitemsFilm={handleUpdateitemsFilm} // обновляем массив фильмов


                        filmPage={filmPages} // отправляем страницу пагинации
                        filmId={filmId} // отправляем id фильма
                        genrisFilms={genrisFilm} // отправляем жанры фильмов
                        filmCheck={filmCheck} // отправляем состояние просмотра
                        checkSelect={checkSelect} // отправляем состояние select
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
