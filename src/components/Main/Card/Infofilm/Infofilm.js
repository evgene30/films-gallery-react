import delImg from "../../../../assets/png/del.png"
import closeImg from "../../../../assets/png/close.png"
import penImg from "../../../../assets/png/pen.png"
import logoImage from "../../../../assets/png/movies.png";
import {useHistory, Link} from "react-router-dom";
import {useState} from "react";
import "./Infofilm.scss";


const Infofilm = (props) => {
    const [state, setState] = useState({
        value: '',
        message: '',
    });

    const img = "https://image.tmdb.org/t/p/w500"; // формируем изображение
    const err = logoImage; // альтернативное изображение на случай отсутствия
    const infoFilm = props.item;
    const history = useHistory();
    const Links = `filmedit=${infoFilm.id}`; // формирование пути роутинга
    const Genri = props.handleGenriFilm;
    const videoTrailer = props.videoTrailer; // трейлер
    const srcLink = `https://www.youtube.com/embed/${videoTrailer.get(infoFilm.id)}`;
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // оценка фильма

    const handleClickClose = () => {
        history.goBack();
        props.handleMarkCard(false);
    }
    const deleteCard = (id) => {
        history.push('./');
        props.handleDeleteCard(id);
        props.handleMarkCard(false);
    }

    const handleChange = (event) => {
        setState({value: event.target.value});
    }

    const RatingPost = (value, id) => {
        if (value) {
            const addRating = {
                value: value, // отправляем нашу оценку фильма
            };
            fetch(
                `https://api.themoviedb.org/3/movie/${id}/rating?api_key=833e2dd8979208fbee927efb619ed90a&session_id=b5ac2e7a824e2eff35e3f452706116df7525a037`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify(addRating),
                },
            )
                .then((response) => response.json())
                .then((result) => {
                        setState({message: result.status_message})
                    }
                )
                .catch((error) => {
                    setState({message: error})
                })
        }
    }
    RatingPost(state.value, infoFilm.id); // отправка запроса рейтинга

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

                    <select name="selectrating" className="select-rating" id="ratingFilm" value={state.value}
                            onChange={handleChange}>
                        <option value="">Выберите оценку фильма</option>
                        {arr.map(item => {
                            return (<option key={item} value={item}>{item}</option>)
                        })}
                    </select>

                </div>
                <p style={{fontWeight: "normal", fontSize: "16px"}}>{infoFilm.overview}</p>

                <div className="film-block__msg">{state.message}</div>

            </div>
            {videoTrailer.get(infoFilm.id) &&
            <div className="film-block__video" style={{marginTop: "100px"}}>
                <iframe id="ytplayer" title="frame" type="text/html" width="100%" height="400"
                        src={srcLink}
                        frameBorder="0" allow="fullscreen"/>
            </div>}
        </div>
    );
}

export default Infofilm;

