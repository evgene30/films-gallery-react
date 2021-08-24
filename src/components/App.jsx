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
import app from "store/servises/fireBase";
import "firebase/database";
import Json from "dummy_data/users.json";

const App = () => {
    const dispatch = useDispatch(); // функция захвата экшена
    const { preloader, user, errors } = useSelector((state) => state.stateApp);

    useEffect(() => {
        const authUser = Json;
        // const db = app.database('https://film-users-default-rtdb.europe-west1.firebasedatabase.app');
        // const user = db.ref("name");
        // user.on("value", (elem) => console.log(elem.val()));

        app.auth().onAuthStateChanged((user) => {
            if (user) {
                if (user.email === authUser[0].email) {
                    dispatch(
                        usersStatus({
                            name: authUser[0].name,
                            status: authUser[0].status,
                            avatar: user.photoURL,
                        })
                    );
                } else {
                    dispatch(
                        usersStatus({
                            name: user.displayName,
                            status: "user",
                            avatar: user.photoURL,
                        })
                    );
                }
            }
        });

        dispatch(getListFilms()); // загружаем список фильмов
        dispatch(getGenrisFilms()); // загружаем жанры
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
