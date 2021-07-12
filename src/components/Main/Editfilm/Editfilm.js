import closeImg from "../../../assets/png/close.png";
// import {useHistory} from "react-router-dom";
import './Editfilm.scss';
import React, {Component} from "react";


class Editfilm extends Component {
    constructor(props) {
        super(props);
        const infoFilm = this.props.item;
        this.state = {
            adult: infoFilm.adult,
            backdrop_path: infoFilm.backdrop_path,
            genre_ids: infoFilm.genre_ids,
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
        };
    }

    handleClickClose = () => {
        // const history = useHistory();
        // history.push('./');

    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)


    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]:
            value
        });
    }

    render() {
        const {
            adult,
            title,
            overview,
            poster_path,
            popularity,
            release_date,
            genre_ids,
            vote_average,
            vote_count
        } = this.state;
        return (
            <div className="addfilm" id="addfilm">
                <img className="close" alt="Close" src={closeImg} onClick={this.handleClickClose}
                     style={{height: "40px", width: "40px"}}/>

                <form className="form_add" id="addform" onSubmit={this.handleSubmit}>

                    <label>Название фильма:</label>
                    <input type="text" onChange={this.handleInputChange} value={title} name="title" id="title_add"
                           minLength="3"/>
                    <label>Описание фильма:</label>
                    <textarea id="textarea_add" name="overview" onChange={this.handleInputChange} value={overview}
                              rows="10"
                              cols="33"
                              minLength="6" maxLength="150"/>
                    <label>Изображение в формате "/name.jpeg"</label>
                    <input id="file-input" type="text"
                           minLength="3" name="poster_path" onChange={this.handleInputChange} value={poster_path}/>
                    <label>Популярность:</label>
                    <input type="number" name="popularity" onChange={this.handleInputChange} value={popularity}
                           id="number_add"/>
                    <label>Дата релиза:</label>
                    <input type="date" id="date_add" name="release_date" onChange={this.handleInputChange}
                           value={release_date} style={{border: "none"}}/>
                    <label>Жанр:</label>
                    <select className="add_select" multiple size="3" name="genre_ids" onChange={this.handleInputChange}
                            value={genre_ids} id="select_add">
                        <option disabled>Выберите 3 жанра</option>
                    </select>
                    <label>Рейтинг:</label>
                    <input type="number" name="vote_average" onChange={this.handleInputChange}
                           value={vote_average} id="average_add"/>
                    <label>Количество голосов:</label>
                    <input type="number" name="vote_count" onChange={this.handleInputChange}
                           value={vote_count}
                           id="count_add"/>
                    <label>Adult
                        <input type="checkbox" name="adult" onChange={this.handleInputChange}
                               value={adult} className="custom-checkbox" id="check_add"/>
                    </label>
                    <button className="sendfilm" type="submit" name="form_auth_submit" id="sendfilm">Сохранить
                    </button>

                </form>
            </div>
        );
    }
}

export default Editfilm;
