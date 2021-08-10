import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Main from "./Main/Main";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    getListFilms,
    getGenrisFilms,
    usersStatus,
} from "store/actions/actions";


const App = () => {
    const dispatch = useDispatch(); // функция захвата экшена
    const {preloader, user, errors} = useSelector((state) => state.stateApp);

    useEffect(() => {
        const userLocal = JSON.parse(localStorage.getItem("User")) || []; // проверка зарегистрированного пользователя
        dispatch(getListFilms()); // загружаем список фильмов
        dispatch(getGenrisFilms()); // загружаем жанры

        if (userLocal) {
            dispatch(
                usersStatus({ name: userLocal.name, status: userLocal.status })
            );
        }
    }, [dispatch]);

    if (errors) {
        return (
            <div className="error-response">
                Ошибка: {errors}
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
                    <Main />
                    <Footer />
                </div>
            </div>
        );
    }
};

export default App;

