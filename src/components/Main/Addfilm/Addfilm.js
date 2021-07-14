import { useHistory } from "react-router-dom";
import closeImg from "../../../assets/png/close.png";
import "./Addfilm.scss";
import { useState } from "react";
import { nanoid } from "nanoid";

const Addfilm = (props) => {
    const history = useHistory();
    const genriFilms = [...props.genrisFilms]; // список жанров
    const cardGenri = new Map(genriFilms.map((item) => [item.id, item])); // создаем карту объектов
    const Genri = genriFilms.map((item) => cardGenri.get(item.id).name); // извлекаем жанры

    const handleClickClose = () => {
        history.push("./");
        props.handleMarkCard(false);
    };
    const [state, setState] = useState({
        id: nanoid(),
        adult: false,
        genre_ids: "",
        media_type: "film",
        original_language: "ru",
        original_title: "",
        overview: "",
        popularity: 0,
        poster_path: "null",
        release_date: "",
        title: "",
        video: "false",
        vote_average: 0,
        vote_count: 0,
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleUpdateitemsFilm(state);
        history.goBack();
        props.handleMarkCard(false);
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

    return (
        <div className="addfilm" id="addfilm">
            <img
                className="close"
                alt="Close"
                src={closeImg}
                onClick={handleClickClose}
                style={{ height: "40px", width: "40px" }}
            />

            <form className="form_add" id="addform" onSubmit={handleSubmit}>
                <label>Добавление нового фильма:</label>
                <input
                    type="text"
                    onChange={handleInputChange}
                    value={title}
                    name="title"
                    id="title_add"
                    minLength="3"
                    placeholder="Название фильма"
                />
                <label>Описание фильма:</label>
                <textarea
                    id="textarea_add"
                    name="overview"
                    onChange={handleInputChange}
                    value={overview}
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
                    value={poster_path}
                />
                <label>Популярность:</label>
                <input
                    type="number"
                    name="popularity"
                    onChange={handleInputChange}
                    value={popularity}
                    id="number_add"
                />
                <label>Дата релиза:</label>
                <input
                    type="date"
                    id="date_add"
                    name="release_date"
                    onChange={handleInputChange}
                    value={release_date}
                    style={{ border: "none" }}
                />
                <label>Жанр:</label>

                <select
                    className="add_select"
                    name="genre_ids"
                    multiple={false}
                    onChange={handleInputChange}
                    value={genre_ids}
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
                    value={vote_average}
                    id="average_add"
                />
                <label>Количество голосов:</label>
                <input
                    type="number"
                    name="vote_count"
                    onChange={handleInputChange}
                    value={vote_count}
                    id="count_add"
                />
                <label>
                    Adult
                    <input
                        type="checkbox"
                        name="adult"
                        onChange={handleInputChange}
                        value={adult}
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
    );
};

export default Addfilm;
