import React, {Component} from "react";
import "./Main.scss";
import Card from "./Card/Card";
import {Route, Switch, Redirect} from "react-router-dom"
import Infofilm from "./Card/Infofilm/Infofilm";


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filmPage: 1,
            filmId: "",
            filmCheck: false,
        };
    }

    handleClick = (event) => {
        const filmsState = Number([this.state.filmPage].map((elem) => elem));

        if (event.target.innerText === "Prev" && filmsState !== 1) {
            this.setState({filmPage: filmsState - 1})
        } else if (event.target.innerText === "Next" && filmsState !== 20) {
            this.setState({filmPage: filmsState + 1})
        } else if (Number(event.target.innerText)) {
            this.setState({filmPage: Number(event.target.innerText)})
        } else {
            this.setState({filmsState: this.state.filmsState})
        }
    }

    handleVisualPagination = (index) => {
        const selectPage = Number(this.state.filmPage);
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
        this.setState({filmId: id});
    }
    handleMarkCard = (check) => {
        this.setState({filmCheck: check})
    }


    render() {
        const massiveFilms = this.props.listFilms; // список фильмов
        const handleDeleteCard = this.props.handleDeleteCard;
        const link = `/id=${this.state.filmId}`; // формирование пути роутинга
        const filmCheck = this.state.filmCheck;
        const styleVisible = (filmCheck ? {display: "none"} : {});

        console.log(filmCheck)


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
                            disabled={this.state.filmCheck}

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
                    <div className="adminbtn"/>
                </section>


                <section className="section-movies">

                    <Switch>
                        <Route path="/" exact>

                            {/*блок отрисовки карточек фильмов*/}
                            <ul className="ul-movies" id="sectionmov">
                                {
                                    (massiveFilms[this.state.filmPage] ? massiveFilms[this.state.filmPage] : massiveFilms[this.state.filmPage - 1]).map((item) => {
                                            return (<Card
                                                key={item.id}
                                                itemCard={item}
                                                handleDeleteCard={handleDeleteCard}
                                                handleFilmsInfo={this.handleFilmsInfo}
                                                handleMarkCard={this.handleMarkCard}
                                                filmId={this.state.filmId}
                                                filmCheck={this.state.filmCheck}

                                            />)
                                        }
                                    )}
                            </ul>

                        </Route>

                        <Route path={link} exact>
                            {
                                massiveFilms[this.state.filmPage].filter(item => item.id === this.state.filmId).map((item) => {
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
                        <Redirect to="/"/>
                    </Switch>

                </section>

                <div className="pagination-block" style={styleVisible}>
                    {/*блок отрисовки пагинации*/}
                    <ul className="pagination" id="pagination">
                        <li tabIndex="0" className="nextclick mt" onClick={this.handleClick}>Prev</li>
                        <li tabIndex="0" className={this.state.filmPage === 1 ? "active" : ""}
                            onClick={this.handleClick}>1
                        </li>
                        {massiveFilms.map((item, index) => {
                            return (<li tabIndex="0" key={index}
                                        className={index + 1 === this.state.filmPage ? "active" : ""}
                                        onClick={this.handleClick}
                                        style={this.handleVisualPagination(index)}
                            >
                                {index + 1}
                            </li>);
                        })}
                        <li tabIndex="0" className={this.state.filmPage === 20 ? "active" : ""}
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
