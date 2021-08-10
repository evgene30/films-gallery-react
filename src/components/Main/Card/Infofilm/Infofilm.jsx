import delImg from "assets/png/del.png";
import React, { useState } from "react";
import closeImg from "assets/png/close.png";
import penImg from "assets/png/pen.png";
import logoImage from "assets/png/movies.png";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./YouTubeTraller/videoYouTube.scss";
import { delFilm } from "store/actions/actions";
import { handleGenriFilm } from "./genrisFilm";
import YouTubeVideo from "./YouTubeTraller/YouTubeVideo";
import {postRatingFim} from "store/servises/postRatingFim";


const Infofilm = (props) => {
    const dispatch = useDispatch(); // функция захвата экшена
    const infoFilm = props.item; // информация о выбранном фильме
    const { genrisFilms, user } = useSelector((state) => state.stateApp); // жанры фильмов
    const genri = infoFilm.genre_ids; // жанр текущего фильма
    const newStyle =
        user.status === "admin" ? { background: "#8080ff" } : {}; // изменение фона для Админа
    const img = "https://image.tmdb.org/t/p/w500"; // формируем изображение
    const err = logoImage; // альтернативное изображение на случай отсутствия
    const history = useHistory();
    const Links = `/edit/${infoFilm.id}`; // формирование пути роутинга
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // оценка фильма

    const [state, setState] = useState({
        message: "",
    });

    const handleClickClose = () => {
        // history.push("./");
        history.goBack();
    };
    const deleteCard = (id) => {
        history.push("./");
        dispatch(delFilm(id, dispatch));
    };

    const handleChange = (event) => {
        RatingPost(event.target.value, infoFilm.id);
    };

    const RatingPost = (value, id) => {
        if (value) {
            const addRating = {
                value: value, // отправляем нашу оценку фильма
            };
            postRatingFim(id, addRating).then(response => setState(response));
        }
    };

    return (
        <div
            tabIndex="0"
            className="film-block"
            id={infoFilm.id}
            style={newStyle}
        >
            <img
                className="close"
                alt="Close"
                src={closeImg}
                onClick={handleClickClose}
            />
            <div className="film-block__img">
                <img
                    src={
                        img + infoFilm.poster_path !==
                        "https://image.tmdb.org/t/p/w500null"
                            ? img + infoFilm.poster_path
                            : err
                    }
                    alt={infoFilm.title}
                    style={{ width: "100%" }}
                />
            </div>

            {user.status === "admin" && (
                <div className="correct">
                    <div className="imgdel">
                        <img
                            id="dell"
                            src={delImg}
                            alt="del"
                            style={{ paddingLeft: "8px" }}
                            onClick={() => deleteCard(infoFilm.id)}
                        />
                    </div>
                    <div className="imgdel">
                        <Link to={Links}>
                            <img
                                id="pen"
                                src={penImg}
                                alt="del"
                                style={{ paddingLeft: "8px" }}
                            />
                        </Link>
                    </div>
                </div>
            )}
            <div className="film-block__text">
                <h2>{infoFilm.title}</h2>
                <h3>
                    {infoFilm.original_title !== infoFilm.title
                        ? infoFilm.original_title
                        : ""}
                </h3>
                <p>Рейтинг: {infoFilm.vote_average}</p>
                <p>Популярность: {infoFilm.popularity}</p>
                <p>Дата релиза: {infoFilm.release_date}</p>
                <p>Количество голосов: {infoFilm.vote_count}</p>
                <p>Жанр: {handleGenriFilm(genri, genrisFilms)}</p>
                {user.name && (
                    <div className="ratingFilm" style={{ display: "block" }}>
                        <select
                            name="selectrating"
                            className="select-rating"
                            id="ratingFilm"
                            value={state.value}
                            onChange={handleChange}
                        >
                            <option value="">Выберите оценку фильма</option>
                            {arr.map((item) => {
                                return (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                )}
                <p style={{ fontWeight: "normal", fontSize: "16px" }}>
                    {infoFilm.overview}
                </p>
                <div className="film-block__msg">{state.message}</div>
            </div>
            <YouTubeVideo id={infoFilm.id} />
        </div>
    );
};

export default Infofilm;
