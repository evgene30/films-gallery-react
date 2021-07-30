import delImg from "../../../../assets/png/del.png";
import React from "react";
import closeImg from "../../../../assets/png/close.png";
import penImg from "../../../../assets/png/pen.png";
import logoImage from "../../../../assets/png/movies.png";
import {useHistory, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./Infofilm.scss";
import {
    delFilm,
    filmChecks,
    traller,
} from "../../../../store/actions/actions";
import {handleGenriFilm} from "./genrisFilm";

const Infofilm = (props) => {
    const dispatch = useDispatch(); // функция захвата экшена
    const infoFilm = props.item; // информация о выбранном фильме
    const genrisFilm = useSelector((state) => state.stateApp.genrisFilms); // жанры фильмов
    const genri = infoFilm.genre_ids; // жанр текущего фильма
    const videoTrailer = useSelector((state) => state.stateApp.videoTrailer); // трейлер фильма
    const infoUser = useSelector((state) => state.stateApp.user); // авторизированный пользователь
    const newStyle =
        infoUser.status === "admin" ? {background: "#8080ff"} : {}; // изменение фона для Админа
    const img = "https://image.tmdb.org/t/p/w500"; // формируем изображение
    const err = logoImage; // альтернативное изображение на случай отсутствия
    const history = useHistory();
    const Links = `filmedit=${infoFilm.id}`; // формирование пути роутинга
    const srcLink = `https://www.youtube.com/embed/${videoTrailer.key}`;
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // оценка фильма

    useEffect(() => {
        dispatch(traller(infoFilm.id));
    }, [dispatch, infoFilm]); // прописываем зависимости

    const [state, setState] = useState({
        message: "",
    });

    const handleClickClose = () => {
        history.goBack();
        dispatch(filmChecks(false));
    };
    const deleteCard = (id) => {
        history.push("./");
        dispatch(delFilm(id, dispatch));
        dispatch(filmChecks(false));
    };

    const handleChange = (event) => {
        RatingPost(event.target.value, infoFilm.id);
    };

    const RatingPost = (value, id) => {
        if (value) {
            const addRating = {
                value: value, // отправляем нашу оценку фильма
            };
            fetch(
                `https://api.themoviedb.org/3/movie/${id}/rating?api_key=833e2dd8979208fbee927efb619ed90a&session_id=b5ac2e7a824e2eff35e3f452706116df7525a037`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify(addRating),
                }
            )
                .then((response) => response.json())
                .then((result) => {
                    if (
                        result.status_message ===
                        "The item/record was updated successfully."
                    ) {
                        setState({
                            message:
                                "Вы уже голосовали. Ваш голос успешно обновлен.",
                        });
                    } else if (result.status_message === "Success.") {
                        setState({message: "Ваш голос отправлен на сервер!"});
                    } else {
                        setState({message: "Ошибка запроса"});
                    }
                })
                .catch((error) => {
                    setState({message: error});
                });
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
                    style={{width: "100%"}}
                />
            </div>

            {infoUser.status === "admin" && (
                <div className="correct">
                    <div className="imgdel">
                        <img
                            id="dell"
                            src={delImg}
                            alt="del"
                            style={{paddingLeft: "8px"}}
                            onClick={() => deleteCard(infoFilm.id)}
                        />
                    </div>
                    <div className="imgdel">
                        <Link to={Links}>
                            <img
                                id="pen"
                                src={penImg}
                                alt="del"
                                style={{paddingLeft: "8px"}}
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
                <p>Жанр: {handleGenriFilm(genri, genrisFilm)}</p>
                {infoUser.name && (
                    <div className="ratingFilm" style={{display: "block"}}>
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
                <p style={{fontWeight: "normal", fontSize: "16px"}}>
                    {infoFilm.overview}
                </p>

                <div className="film-block__msg">{state.message}</div>
            </div>
            {videoTrailer.key && (
                <div
                    className="film-block__video"
                    style={{marginTop: "100px"}}
                >
                    <iframe
                        id="ytplayer"
                        title="frame"
                        type="text/html"
                        width="100%"
                        height="400"
                        src={srcLink}
                        frameBorder="0"
                        allow="fullscreen"
                    />
                </div>
            )}
        </div>
    );
};

export default Infofilm;
