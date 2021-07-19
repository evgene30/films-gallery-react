import React, { Component } from "react";
import "./Main.scss";
import Card from "./Card/Card";
import { Route, Switch, Redirect } from "react-router-dom";
import Infofilm from "./Card/Infofilm/Infofilm";
import { Link } from "react-router-dom";
import Addfilm from "./Addfilm/Addfilm";
import Editfilm from "./Editfilm/Editfilm";
import Pagination from "./Pagination/Pagination";
import Select from "./Select/Select";
import Register from "./Register/Register";

class Main extends Component {
    handleMarkCard = (check) => {
        this.props.handleUpdatefilmCheck(check);
    };

    render() {
        const massiveFilms = [...this.props.listFilms]; // список сортированных фильмов
        const link = `/id=${this.props.filmId}`; // формирование пути роутинга
        const originalListFilms = [...this.props.itemsFilm]; // список НЕ сортированных фильмов
        const LinkEdit = `/filmedit=${this.props.filmId}`; // путь приема динамического адреса
        const infoUser = this.props.infoUser; // информация о зарегистрированном пользователе
        const newStyle = this.props.newStyle; // изменение фона пользователя
        const filmCheck = this.props.filmCheck;

        return (
            <main id="firstmain" style={newStyle}>
                <section className="section-header">
                    {/*блок выбора фильтра*/}
                    <Select />
                    {infoUser.status === "admin" && (
                        <div className="adminbtn">
                            <Link to="newfilm">
                                <button
                                    className="buttonAdmin"
                                    title="Добавить видео"
                                    tabIndex="0"
                                    id="adminbutton"
                                    onClick={() => this.handleMarkCard(true)}
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
                                {(massiveFilms[this.props.filmPage]
                                    ? massiveFilms[this.props.filmPage]
                                    : massiveFilms[this.props.filmPage - 1]
                                )?.map((item) => {
                                    return (
                                        <Card key={item.id} itemCard={item} />
                                    );
                                })}
                            </ul>
                        </Route>
                        <Route path={link} exact>
                            {/*блок отрисовки фильма по клику*/}
                            {originalListFilms
                                .filter((item) => item.id === this.props.filmId)
                                .map((item) => {
                                    return (
                                        <Infofilm key={item.id} item={item} />
                                    );
                                })}
                        </Route>
                        <Route path="/newfilm" exact>
                            {/*блок отрисовки добавления фильма*/}
                            <Addfilm />
                        </Route>
                        <Route path={LinkEdit} exact>
                            {originalListFilms
                                .filter((item) => item.id === this.props.filmId)
                                .map((item) => {
                                    return (
                                        <Editfilm key={item.id} item={item} />
                                    );
                                })}
                        </Route>
                        <Route path="/register" exact>
                            <Register />
                        </Route>
                        <Redirect to="/" />
                    </Switch>
                </section>

                {!filmCheck && (
                    <Pagination
                        massiveFilms={massiveFilms} // список сортированных фильмов
                    />
                )}
            </main>
        );
    }
}

export default Main;
