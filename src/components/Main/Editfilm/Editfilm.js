import closeImg from "../../../assets/png/close.png";
import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import "./Editfilm.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilm } from "../../../store/actions/actions";
import { newFilms } from "../Addfilm/addNewFilm";
import { nanoid } from "nanoid";
import PropTypes from 'prop-types';

const Editfilm = (props) => {
    const admin = JSON.parse(localStorage.getItem("User")) || [];
    const dispatch = useDispatch(); // функция захвата экшена
    const infoFilm = props.item;
    const itemsFilm = useSelector((state) => state.stateApp.itemsFilm); // список всех фильмов
    const genrisFilm = useSelector((state) => state.stateApp.genrisFilms); // жанры фильмов
    const cardGenri = new Map(genrisFilm.map((item) => [item.id, item])); // создаем карту объектов
    const Genri = genrisFilm.map((item) => cardGenri.get(item.id).name); // извлекаем жанры

    const history = useHistory();
    const [state, setState] = useState({
        id: infoFilm.id,
        adult: infoFilm.adult,
        backdrop_path: infoFilm.backdrop_path,
        genre_ids: "",
        media_type: infoFilm.media_type,
        original_language: infoFilm.original_language,
        original_title: infoFilm.original_title,
        overview: infoFilm.overview,
        popularity: infoFilm.popularity,
        poster_path: infoFilm.poster_path,
        release_date: infoFilm.release_date,
        title: infoFilm.title,
        video: infoFilm.video,
        vote_average: infoFilm.vote_average,
        vote_count: infoFilm.vote_count,
    });

    const handleClickClose = () => {
        history.goBack();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addFilm(newFilms(state, itemsFilm))); // обработка логики добавления/изменения фильма
        history.goBack();
    };

    const handleInputChange = (event) => {
        const target = event.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const {
        adult,
        title,
        overview,
        poster_path,
        popularity,
        release_date,
        genre_ids,
        vote_average,
        vote_count,
    } = state;
    return admin.status === "admin" ? (
        <div className="addfilm" id="addfilm">
            <img
                className="close"
                alt="Close"
                src={closeImg}
                onClick={handleClickClose}
                style={{ height: "40px", width: "40px" }}
            />

            <form className="form_add" id="addform" onSubmit={handleSubmit}>
                <label>Название фильма:</label>
                <input
                    type="text"
                    onChange={handleInputChange}
                    value={title || ""}
                    name="title"
                    id="title_add"
                    minLength="3"
                />
                <label>Описание фильма:</label>
                <textarea
                    id="textarea_add"
                    name="overview"
                    onChange={handleInputChange}
                    value={overview || ""}
                    rows="10"
                    cols="33"
                    minLength="6"
                    maxLength="150"
                />
                <label>Изображение в формате "/name.jpeg"</label>
                <input
                    id="file-input"
                    type="text"
                    minLength="3"
                    name="poster_path"
                    onChange={handleInputChange}
                    value={poster_path || ""}
                />
                <label>Популярность:</label>
                <input
                    type="number"
                    name="popularity"
                    onChange={handleInputChange}
                    value={popularity || ""}
                    id="number_add"
                />
                <label>Дата релиза:</label>
                <input
                    type="date"
                    id="date_add"
                    name="release_date"
                    onChange={handleInputChange}
                    value={release_date || ""}
                    style={{ border: "none" }}
                />
                <label>Жанр:</label>

                <select
                    className="add_select"
                    name="genre_ids"
                    onChange={handleInputChange}
                    value={genre_ids}
                    multiple={false}
                    id="select_add"
                >
                    {Genri.map((item) => {
                        return <option key={nanoid()}>{item}</option>;
                    })}
                </select>

                <label>Рейтинг:</label>
                <input
                    type="number"
                    name="vote_average"
                    onChange={handleInputChange}
                    value={vote_average || ""}
                    id="average_add"
                />
                <label>Количество голосов:</label>
                <input
                    type="number"
                    name="vote_count"
                    onChange={handleInputChange}
                    value={vote_count || ""}
                    id="count_add"
                />
                <label>
                    Adult
                    <input
                        type="checkbox"
                        name="adult"
                        onChange={handleInputChange}
                        value={adult || ""}
                        className="custom-checkbox"
                        id="check_add"
                    />
                </label>
                <button
                    className="sendfilm"
                    type="submit"
                    name="form_auth_submit"
                    id="sendfilm"
                >
                    Сохранить
                </button>
            </form>
        </div>
    ) : (
        <Redirect to="../register" />
    );
};

export default Editfilm;


Editfilm.propTypes = {
    item: PropTypes.object.isRequired,
}
