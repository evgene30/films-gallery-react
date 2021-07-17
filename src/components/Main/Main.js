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
    handleFilmsInfo = (id) => {
        this.props.handleUpdatefilmId(id);
    };

    handleMarkCard = (check) => {
        this.props.handleUpdatefilmCheck(check);
    };

    handleGenriFilm = (genriFilm, genrisFilms) => {
        const genri = genriFilm; // жанр отдельно взятого фильма
        const listAllgenri = [...genrisFilms]; // список всех жанров
        const cardGenri = new Map(listAllgenri.map((item) => [item.id, item])); // создаем карту объектов
        if (genri) {
            if (typeof genri === "string") {
                return genri;
            } else {
                const Genri = genri.map((item) => cardGenri.get(item)?.name);
                return Genri.join();
            }
        } else {
            return "";
        }
    };

    render() {
        const massiveFilms = [...this.props.listFilms]; // список сортированных фильмов
        const handleDeleteCard = this.props.handleDeleteCard; // пробрасываем далее функцию удаления фильма
        const link = `/id=${this.props.filmId}`; // формирование пути роутинга
        const styleVisible = this.props.filmCheck ? { display: "none" } : {}; // проверка состояния для блокирования
        // элементов
        const originalListFilms = [...this.props.itemsFilm]; // список НЕ сортированных фильмов
        const handleUpdateitemsFilm = this.props.handleUpdateitemsFilm; // функция обновления для объектов нового и
        // редактируемого фильма
        const genrisFilms = this.props.genrisFilms; // отправляем жанры фильма
        const LinkEdit = `/filmedit=${this.props.filmId}`; // путь приема динамического адреса
        const videoTrailer = this.props.videoTrailer; // ссылка на трейлер
        const hendleVerificationUser = this.props.hendleVerificationUser; // функция верификации пользователя
        const infoUser = this.props.infoUser; // информация о зарегистрированном пользователе
        const newStyle = this.props.newStyle; // изменение фона пользователя

        return (
            <main id="firstmain" style={newStyle}>
                <section className="section-header">
                    {/*блок выбора фильтра*/}
                    <Select
                        handleSortFilmSelect={this.props.handleSortFilmSelect}
                        checkSelect={this.props.checkSelect}
                    />
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
                                        <Card
                                            key={item.id}
                                            itemCard={item}
                                            handleDeleteCard={handleDeleteCard}
                                            handleFilmsInfo={
                                                this.handleFilmsInfo
                                            }
                                            handleMarkCard={this.handleMarkCard}
                                            filmId={this.props.filmId}
                                            filmCheck={this.props.filmCheck}
                                            infoUser={infoUser}
                                        />
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
                                        <Infofilm
                                            newStyle={newStyle}
                                            infoUser={infoUser}
                                            key={item.id}
                                            item={item}
                                            handleDeleteCard={handleDeleteCard}
                                            handleMarkCard={this.handleMarkCard}
                                            handleGenriFilm={this.handleGenriFilm(
                                                item.genre_ids,
                                                genrisFilms
                                            )}
                                            videoTrailer={videoTrailer}
                                        />
                                    );
                                })}
                        </Route>
                        <Route path="/newfilm" exact>
                            {/*блок отрисовки добавления фильма*/}
                            <Addfilm
                                handleMarkCard={this.handleMarkCard}
                                handleUpdateitemsFilm={handleUpdateitemsFilm}
                                genrisFilms={genrisFilms}
                            />
                        </Route>
                        <Route path={LinkEdit} exact>
                            {originalListFilms
                                .filter((item) => item.id === this.props.filmId)
                                .map((item) => {
                                    return (
                                        <Editfilm
                                            key={item.id}
                                            item={item}
                                            handleUpdateitemsFilm={
                                                handleUpdateitemsFilm
                                            }
                                        />
                                    );
                                })}
                        </Route>
                        <Route path="/register" exact>
                            <Register
                                handleMarkCard={this.handleMarkCard}
                                hendleVerificationUser={hendleVerificationUser}
                            />
                        </Route>
                        <Redirect to="/" />
                    </Switch>
                </section>

                <Pagination
                    styleVisible={styleVisible} // проверка состояния для блокирования элементов
                    filmPage={this.props.filmPage} // текущая выбранная страница
                    massiveFilms={massiveFilms} // список сортированных фильмов
                    handleUpdatefilmPage={this.props.handleUpdatefilmPage} // функция записи в стейт кликнутой
                    // страницы
                />
            </main>
        );
    }
}

export default Main;
