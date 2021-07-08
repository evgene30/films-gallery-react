import React, {Component} from "react";
import "./Card.scss";
import logoImage from "../../../assets/png/movies.png";
import delImg from "../../../assets/png/del.png"


class Card extends Component {
    deleteCard = (id) => {
        this.props.handleDeleteCard(id);
    }

    render() {
        const {itemCard} = this.props;
        const img = "https://image.tmdb.org/t/p/w500"; // формируем изображение
        const err = logoImage; // альтернативное изображение на случай отсутствия
        const delImage = delImg;

        return (
            <li
                tabIndex="0"
                className="card-block"
                id={itemCard.id}
            >
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
                        style={{width: "100%"}}
                    />
                    <div className="container">
                        <h4>
                            <b>
                                {itemCard.original_title !==
                                itemCard.title
                                    ? itemCard.original_title
                                    : ""}
                            </b>
                        </h4>
                        <p>{itemCard.title}</p>
                    </div>
                </div>
                <div className="imgdel">
                    <img id="dell" src={delImage}
                         alt="del"
                         style={{paddingLeft: "8px"}}
                         onClick={() => this.deleteCard(itemCard.id)}
                    />
                </div>
            </li>
        );
    }
}

export default Card;