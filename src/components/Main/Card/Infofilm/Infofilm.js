import delImg from "../../../../assets/png/del.png"
import closeImg from "../../../../assets/png/close.png"
import penImg from "../../../../assets/png/pen.png"
import logoImage from "../../../../assets/png/movies.png";
import {useHistory} from "react-router-dom";
import {Link} from "react-router-dom";


const Infofilm = (props) => {

    const img = "https://image.tmdb.org/t/p/w500"; // формируем изображение
    const err = logoImage; // альтернативное изображение на случай отсутствия
    const infoFilm = props.item;
    const history = useHistory();
    const Links = `filmedit=${infoFilm.id}`; // формирование пути роутинга
    const Genri = props.handleGenriFilm;


    const handleClickClose = () => {
        history.goBack();
        props.handleMarkCard(false);
    }
    const deleteCard = (id) => {
        history.push('./');
        props.handleDeleteCard(id);
        props.handleMarkCard(false);
    }


    return (
        <div tabIndex="0" className="film-block" id={infoFilm.id}>
            <img className="close" alt="Close" src={closeImg} onClick={handleClickClose}/>
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

            <div className="correct">
                <div className="imgdel">
                    <img id="dell" src={delImg} alt="del" style={{paddingLeft: "8px"}}
                         onClick={() => deleteCard(infoFilm.id)}/>
                </div>
                <div className="imgdel">
                    <Link to={Links}>
                        <img id="pen" src={penImg} alt="del" style={{paddingLeft: "8px"}}
                        />
                    </Link>
                </div>
            </div>

            <div className="film-block__text">
                <h2>{infoFilm.title}</h2>
                <h3>{
                    infoFilm.original_title !== infoFilm.title
                        ? infoFilm.original_title
                        : ''
                }</h3>
                <p>Рейтинг: {infoFilm.vote_average}</p>
                <p>Популярность: {infoFilm.popularity}</p>
                <p>Дата релиза: {infoFilm.release_date}</p>
                <p>Количество голосов: {infoFilm.vote_count}</p>
                <p>Жанр: {Genri}</p>
                <div className="ratingFilm" style={{display: "block"}}>
                    <select name="selectrating" className="select-rating" id="ratingFilm">
                        <option value="">Выберите оценку фильма</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <p>{infoFilm.overview}</p>
            </div>
        </div>

    );

}

export default Infofilm;

