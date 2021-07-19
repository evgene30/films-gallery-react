import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Main from "./Main/Main";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    newListFilms,
    genrisFilms,
    filmChecks,
    usersStatus,
} from "../store/actions/actions";

const App = () => {
    const dispatch = useDispatch(); // функция захвата экшена
    const itemsFilm = useSelector((state) => state.stateApp.itemsFilm); // списк всех фильмов
    const preloader = useSelector((state) => state.stateApp.preloader); // передзагрузчик
    const user = useSelector((state) => state.stateApp.user); // авторизированный пользователь
    const errors = useSelector((state) => state.stateApp.error); // отлов ошибок промиса
    const filmId = useSelector((state) => state.stateApp.filmId); // ID выбранного фильма
    const filmCheck = useSelector((state) => state.stateApp.filmCheck); // убираем блок пагинации при клике
    const filmPages = useSelector((state) => state.stateApp.filmPage); // отправляем страницу пагинации
    const newStyle = user.status === "admin" ? { background: "#8080ff" } : {}; // изменение фона для Админа

    // const us = localStorage.getItem("User");
    // console.log(us)

    useEffect(() => {
        dispatch(newListFilms()); // загружаем список фильмов
        dispatch(genrisFilms()); // загружаем жанры
        const userLocal = JSON.parse(localStorage.getItem("User")) || [];
        if (userLocal) {
            dispatch(
                usersStatus({ name: userLocal.name, status: userLocal.status })
            );
        }
    }, [dispatch]);

    const packMassiveFilm = (array) => {
        // разбиваем исходный массив на вложенные массивы по 20 вложенных массивов для пагинации
        const massiveFilmsNew = [];
        for (let i = 0; i < Math.ceil(array.length / 20); i++) {
            massiveFilmsNew[i] = array.slice(i * 20, i * 20 + 20);
        }
        return massiveFilmsNew;
    };

    const handleUpdatefilmCheck = (object) => {
        // обновление значения визуализации блока пагинации
        dispatch(filmChecks(object));
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
        return <div id="preloader" className="visible" />;
    } else {
        return (
            <div
                className="App"
                style={user.status === "admin" ? { background: "#dae7f1" } : {}}
            >
                <div className="container">
                    <Header />
                    <Main
                        handleUpdatefilmCheck={handleUpdatefilmCheck} // обновляем состояние просмотра пагинации
                        listFilms={packMassiveFilm(itemsFilm)} // отправляем массив разделенных (на подмассивы)
                        filmPage={filmPages} // отправляем страницу пагинации
                        filmId={filmId} // отправляем id фильма
                        filmCheck={filmCheck} // отправляем состояние просмотра
                        itemsFilm={itemsFilm} // отправляем массив НЕ разделенных фильмов (изначальный)
                        infoUser={user} // информация о зарегистрированном пользователе
                        newStyle={newStyle} // изменение фона для пользователей
                    />
                    <Footer />
                </div>
            </div>
        );
    }
};

export default App;
