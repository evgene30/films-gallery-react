import React, { Component } from "react";
import "./Main.scss";

class Main extends Component {
    render() {
        const massiveFilms = this.props.listFilms; // список фильмов
        const img = "https://image.tmdb.org/t/p/w500"; // формируем изображение
        const err = "../images/content/movies.png"; // альтернативное изображение на случай отсутсвия
        return (
            <main id="firstmain">
                <section className="section-header">
                    <form name="sort_list" id="filter" action="#">
                        <select
                            name="sortList"
                            className="select-css"
                            id="filters"
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
                    <div className="adminbtn" />
                </section>
                <section className="section-movies">
                    <ul className="ul-movies" id="sectionmov">
                        {massiveFilms[0].map((item) => {
                            return (
                                <li
                                    tabIndex="0"
                                    className="card-block"
                                    id={item.id}
                                    key={item.id}
                                >
                                    <div className="card" title={item.title}>
                                        <div className="hover-img">
                                            <p>Релиз: {item.release_date}</p>
                                            <p>Рейтинг: {item.vote_average}</p>
                                        </div>
                                        <img
                                            src={
                                                img + item.poster_path !==
                                                "https://image.tmdb.org/t/p/w500null"
                                                    ? img + item.poster_path
                                                    : err
                                            }
                                            alt={item.title}
                                            style={{ width: "100%" }}
                                        />
                                        <div className="container">
                                            <h4>
                                                <b>
                                                    {item.original_title !==
                                                    item.title
                                                        ? item.original_title
                                                        : ""}
                                                </b>
                                            </h4>
                                            <p>{item.title}</p>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </section>

                <div className="pagination-block">
                    <ul className="pagination" id="pagination"></ul>
                </div>
            </main>
        );
    }
}

export default Main;
