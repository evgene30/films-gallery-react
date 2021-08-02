import React from "react";
import "./Main.scss";
import Card from "./Card/Card";
import {Route, Switch, Redirect, useParams} from "react-router-dom";
import Infofilm from "./Card/Infofilm/Infofilm";
import {Link} from "react-router-dom";
import Addfilm from "./Addfilm/Addfilm";
import Editfilm from "./Editfilm/Editfilm";
import Pagination from "./Pagination/Pagination";
import Select from "./Select/Select";
import Register from "./Register/Register";
import {useSelector} from "react-redux";

const Main = () => {
    const originalListFilms = useSelector((state) => state.stateApp.itemsFilm); // список всех фильмов
    const infoUser = useSelector((state) => state.stateApp.user); // авторизированный пользователь
    const newStyle = infoUser.status === "admin" ? {background: "#8080ff"} : {}; // изменение фона для Админа
    const filmPage = useSelector((state) => state.stateApp.filmPage); // отправляем страницу пагинации
    const massiveFilms = packMassiveFilm(originalListFilms); // список рассортированных для пагинации фильмов


    function packMassiveFilm(array) {
        // разбиваем исходный массив на вложенные массивы по 20 вложенных массивов для пагинации
        const massiveFilmsNew = [];
        for (let i = 0; i < Math.ceil(array.length / 20); i++) {
            massiveFilmsNew[i] = array.slice(i * 20, i * 20 + 20);
        }
        return massiveFilmsNew;
    }

    function RouteWithSubRoutes(route) {
        return (
            <Route
                path={route.path}
                render={props => (
                    <route.component {...props} routes={route.routes}/>
                )}
            />
        );
    }

    function Film() {
        let {id} = useParams();
        if (Number(id)) {
            return (
                originalListFilms
                    .filter((item) => item.id === Number(id))
                    .map((item) => <Infofilm key={item.id} item={item}/>)
            );
        } else {
            return (
                originalListFilms
                    .filter((item) => item.id === id)
                    .map((item) => <Infofilm key={item.id} item={item}/>)
            );
        }
    }

    function Edit() {
        let {id} = useParams();
        if (Number(id)) {
            return (
                originalListFilms
                    .filter((item) => item.id === Number(id))
                    .map((item) => {
                        return (
                            <Editfilm key={item.id} item={item}/>
                        );
                    })
            )
        } else {
            return (
                originalListFilms
                    .filter((item) => item.id === id)
                    .map((item) => {
                        return (
                            <Editfilm key={item.id} item={item}/>
                        );
                    })
            )
        }
    }

    const routes = [
        {
            path: "/register",
            component: Register,
        },
        {
            path: "/newfilm",
            component: Addfilm,
        },
    ];

    return (
        <main id="firstmain" style={newStyle}>
            <section className="section-header">
                {/*блок выбора фильтра*/}
                <Select/>
                {infoUser.status === "admin" && (
                    <div className="adminbtn">
                        <Link to="newfilm">
                            <button
                                className="buttonAdmin"
                                title="Добавить видео"
                                tabIndex="0"
                                id="adminbutton"
                            >
                                Add
                            </button>
                        </Link>
                    </div>
                )}
            </section>

            <section className="section-movies">
                <Switch>
                    <Route path="/" exact>
                        {/*блок отрисовки карточек фильмов*/}
                        <ul className="ul-movies" id="sectionmov">
                            {
                                massiveFilms[filmPage]?.map((item) => <Card key={item.id} itemCard={item}/>)
                            }
                        </ul>
                        <Pagination
                            massiveFilms={massiveFilms} // список сортированных фильмов
                        />
                    </Route>

                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}

                    <Route path="/:id" exact children={<Film/>}/>
                    <Route path="/edit/:id" exact children={<Edit/>}/>
                    <Redirect to="/"/>
                </Switch>
            </section>
        </main>
    );
}

export default Main;
