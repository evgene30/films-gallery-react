import React, {Component} from "react";
import "./Main.scss";
import Card from "./Card/Card";
import {Route, Switch, Redirect} from "react-router-dom"
import Infofilm from "./Card/Infofilm/Infofilm";
import {Link} from "react-router-dom";
import Addfilm from "./Addfilm/Addfilm";
import Editfilm from "./Editfilm/Editfilm";


class Main extends Component {

    handleClick = (event) => {
        const filmsState = Number([this.props.filmPage].map((elem) => elem));

        if (event.target.innerText === "Prev" && filmsState !== 1) {
            this.props.handleUpdatefilmPage(filmsState - 1);
        } else if (event.target.innerText === "Next" && filmsState !== 20) {
            this.props.handleUpdatefilmPage(filmsState + 1);
        } else if (Number(event.target.innerText)) {
            this.props.handleUpdatefilmPage(Number(event.target.innerText));
        } else {
            // this.setState({filmsState: this.state.filmsState})
            this.props.handleUpdatefilmPage(this.props.filmPage);
        }
    }

    handleVisualPagination = (index) => {
        const selectPage = Number(this.props.filmPage);
        switch (selectPage >= 1 && selectPage <= 20) {
            case (selectPage >= 1 && selectPage <= 4 && index > 0 && index < 5):
                return {display: "flex"};
            case (selectPage >= 5 && selectPage < 8 && index > 2 && index < 8):
                return {display: "flex"};
            case (selectPage >= 8 && selectPage < 11 && index > 5 && index < 11):
                return {display: "flex"};
            case (selectPage >= 11 && selectPage < 14 && index > 8 && index < 14):
                return {display: "flex"};
            case (selectPage >= 14 && selectPage < 17 && index > 11 && index < 17):
                return {display: "flex"};
            case (selectPage >= 17 && selectPage <= 20 && index > 14 && index < 19):
                return {display: "flex"};
            default:
                return {display: "none"}
        }
    }

    handleChangeSelect = (event) => {
        this.props.handleSortFilmSelect(event.target.value); // забираем значение select
    }

    handleFilmsInfo = (id) => {
        this.props.handleUpdatefilmId(id);

    }

    handleMarkCard = (check) => {
        this.props.handleUpdatefilmCheck(check);
    }

    render() {
        const massiveFilms = [...this.props.listFilms]; // список сортированных фильмов
        const handleDeleteCard = this.props.handleDeleteCard; // пробрасываем далее функцию удаления фильма
        const link = `/id=${this.props.filmId}`; // формирование пути роутинга
        const styleVisible = (this.props.filmCheck ? {display: "none"} : {}); // проверка состояния для блокирования
        // элементов
        const originalListFilms = [...this.props.itemsFilm]; // список НЕ сортированных фильмов
        const handleUpdateitemsFilm = this.props.handleUpdateitemsFilm; // функция обновления для объектов нового и
        // редактируемого фильма
        const LinkEdit = `/filmedit=${this.props.filmId}`; // путь приема динамического адреса


        return (
            <main id="firstmain">

                <section className="section-header">
                    {/*блок выбора фильтра*/}
                    <form name="sort_list" id="filter" action="#">
                        <select
                            name="sortList"
                            className="select-css"
                            id="filters"
                            onChange={this.handleChangeSelect}
                            disabled={this.props.filmCheck}


                        >
                            <option value="id">Выберите фильтр...</option>
                            <option value="popularity">Популярность</option>
                            <option value="vote_average">Рейтинг</option>
                            <option value="vote_count">
                                Количество голосов
                            </option>
                            <option value="release_date">Дата релиза</option>
                        </select>

                    </form>
                    <div className="adminbtn">
                        <Link to="newfilm">
                            <button className="buttonAdmin" title="Добавить видео" tabIndex="0"
                                    id="adminbutton"
                                    onClick={() => this.handleMarkCard(true)}
                            >Add
                            </button>
                        </Link>
                    </div>
                </section>

                <section className="section-movies">
                    <Switch>
                        <Route path="/" exact>
                            {/*блок отрисовки карточек фильмов*/}
                            <ul className="ul-movies" id="sectionmov">
                                {
                                    (massiveFilms[this.props.filmPage] ? massiveFilms[this.props.filmPage] : massiveFilms[this.props.filmPage - 1]).map((item) => {
                                            return (<Card
                                                key={item.id}
                                                itemCard={item}
                                                handleDeleteCard={handleDeleteCard}
                                                handleFilmsInfo={this.handleFilmsInfo}
                                                handleMarkCard={this.handleMarkCard}
                                                filmId={this.props.filmId}
                                                filmCheck={this.props.filmCheck}

                                            />)
                                        }
                                    )}
                            </ul>

                        </Route>
                        <Route path={link} exact>
                            {/*блок отрисовки фильма по клику*/}
                            {
                                originalListFilms.filter(item => item.id === this.props.filmId).map((item) => {
                                    return (
                                        <Infofilm
                                            key={item.id}
                                            item={item}
                                            handleDeleteCard={handleDeleteCard}
                                            handleMarkCard={this.handleMarkCard}
                                        />
                                    )
                                })
                            }
                        </Route>
                        <Route path="/newfilm" exact>
                            {/*блок отрисовки добавления фильма*/}
                            <Addfilm
                                handleMarkCard={this.handleMarkCard}
                                handleUpdateitemsFilm={handleUpdateitemsFilm}
                            />
                        </Route>
                        <Route path={LinkEdit} exact>

                            {
                                originalListFilms.filter(item => item.id === this.props.filmId).map((item) => {
                                    return (
                                        <Editfilm
                                            key={item.id}
                                            item={item}
                                            handleUpdateitemsFilm={handleUpdateitemsFilm}
                                        />
                                    )
                                })
                            }

                        </Route>
                        <Redirect to="/"/>
                    </Switch>
                </section>

                <div className="pagination-block" style={styleVisible}>
                    {/*блок отрисовки пагинации*/}
                    <ul className="pagination" id="pagination">
                        <li tabIndex="0" className="nextclick mt" onClick={this.handleClick}>Prev</li>
                        <li tabIndex="0" className={this.props.filmPage === 1 ? "active" : ""}
                            onClick={this.handleClick}>1
                        </li>
                        {massiveFilms.map((item, index) => {
                            return (<li tabIndex="0" key={index}
                                        className={index + 1 === this.props.filmPage ? "active" : ""}
                                        onClick={this.handleClick}
                                        style={this.handleVisualPagination(index)}
                            >
                                {index + 1}
                            </li>);
                        })}
                        <li tabIndex="0" className={this.props.filmPage === 20 ? "active" : ""}
                            onClick={this.handleClick}>20
                        </li>
                        <li tabIndex="0" className="nextclick mt" onClick={this.handleClick}>Next</li>
                    </ul>
                </div>

            </main>
        );
    }
}

export default Main;
