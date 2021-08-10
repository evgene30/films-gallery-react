import "./Card.scss";
import React from "react";
import logoImage from "assets/png/movies.png";
import delImg from "assets/png/del.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { delFilm } from "store/actions/actions";
import PropTypes from 'prop-types';


const Card = (props) => {
    const dispatch = useDispatch(); // функция захвата экшена
    const infoUser = useSelector((state) => state.stateApp.user); // авторизированный пользователь
    const { itemCard } = props; // информация о выбранном фильме
    const img = "https://image.tmdb.org/t/p/w500"; // формируем изображение
    const err = logoImage; // альтернативное изображение на случай отсутствия
    const delImage = delImg; // картинка удаления
    const link = `/${itemCard.id}`; // формирование строки адреса отдельного фильма для роутинга

    const deleteCard = (id) => {
        dispatch(delFilm(id, dispatch));
    };

    return (
        <li tabIndex="0" className="card-block" id={itemCard.id}>
            <Link to={link}>
                <div className="card" title={itemCard.title}>
                    <div className="hover-img">
                        <p>Релиз: {itemCard.release_date}</p>
                        <p>Рейтинг: {itemCard.vote_average}</p>
                    </div>
                    <img
                        src={
                            img + itemCard.poster_path !==
                            "https://image.tmdb.org/t/p/w500null"
                                ? img + itemCard.poster_path
                                : err
                        }
                        alt={itemCard.title}
                        style={{ width: "100%" }}
                    />
                    <div className="container">
                        <h4>
                            <b>
                                {itemCard.original_title !== itemCard.title
                                    ? itemCard.original_title
                                    : ""}
                            </b>
                        </h4>
                        <p>{itemCard.title}</p>
                    </div>
                </div>
            </Link>
            {infoUser.status === "admin" && (
                <div className="imgdel">
                    <img
                        id="dell"
                        src={delImage}
                        alt="del"
                        style={{ paddingLeft: "8px" }}
                        onClick={() => deleteCard(itemCard.id)}
                    />
                </div>
            )}
        </li>
    );
};

export default Card;

Card.propTypes = {
    itemCard: PropTypes.object.isRequired,
}

