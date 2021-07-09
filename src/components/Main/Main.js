import React, {Component} from "react";
import "./Main.scss";
import Card from "./Card/Card";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filmPage: 1,
        };
    }

    handleClick = (event) => {
        const filmsState = Number([this.state.filmPage].map((elem) => elem));

        if (event.target.innerText === "Prev" && filmsState !== 1) {
            this.setState({filmPage: filmsState - 1})
        } else if (event.target.innerText === "Next" && filmsState !== 20) {
            this.setState({filmPage: filmsState + 1})
        } else if (Number(event.target.innerText)) {
            this.setState({filmPage: Number(event.target.innerText)})
        } else {
            this.setState({filmsState: this.state.filmsState})
        }
    }

    handleVisualPagination = (index) => {
        const selectPage = Number(this.state.filmPage);
        switch (selectPage >= 1 && selectPage <= 20) {
            case (selectPage >= 1 && selectPage <= 4 && index > 0 && index < 5):
                return {display: "flex"};
            case (selectPage >= 5 && selectPage < 8 && index > 2 && index < 8):
                return {display: "flex"};
            case (selectPage >= 8 && selectPage < 11 && index > 5 && index < 11):
                return {display: "flex"};
            case (selectPage >= 11 && selectPage < 14 && index > 8 && index < 14):
                return {display: "flex"};
            case (selectPage >= 14 && selectPage < 17 && index > 11 && index < 17):
                return {display: "flex"};
            case (selectPage >= 17 && selectPage <= 20 && index > 14 && index < 19):
                return {display: "flex"};
            default:
                return {display: "none"}
        }
    }

    handleChangeSelect = (event) => {
        this.props.handleSortFilmSelect(event.target.value); // забираем значение select
    }

    render() {
        const massiveFilms = this.props.listFilms; // список фильмов
        const handleDeleteCard = this.props.handleDeleteCard;

        return (
            <main id="firstmain">
                <section className="section-header">
                    <form name="sort_list" id="filter" action="#">
                        <select
                            name="sortList"
                            className="select-css"
                            id="filters"
                            onChange={this.handleChangeSelect}
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
                    <div className="adminbtn"/>
                </section>
                <section className="section-movies">
                    <ul className="ul-movies" id="sectionmov">
                        {
                            (massiveFilms[this.state.filmPage] ? massiveFilms[this.state.filmPage] : massiveFilms[this.state.filmPage - 1]).map((item) => {
                                    return (<Card
                                        key={item.id}
                                        itemCard={item}
                                        handleDeleteCard={handleDeleteCard}
                                    />)
                                }
                            )}
                    </ul>
                </section>
                <div className="pagination-block">
                    <ul className="pagination" id="pagination">
                        <li tabIndex="0" className="nextclick mt" onClick={this.handleClick}>Prev</li>
                        <li tabIndex="0" className={this.state.filmPage === 1 ? "active" : ""}
                            onClick={this.handleClick}>1
                        </li>
                        {massiveFilms.map((item, index) => {
                            return (<li tabIndex="0" key={index}
                                        className={index + 1 === this.state.filmPage ? "active" : ""}
                                        onClick={this.handleClick}
                                        style={this.handleVisualPagination(index)}
                            >
                                {index + 1}
                            </li>);
                        })}
                        <li tabIndex="0" className={this.state.filmPage === 20 ? "active" : ""}
                            onClick={this.handleClick}>20
                        </li>
                        <li tabIndex="0" className="nextclick mt" onClick={this.handleClick}>Next</li>
                    </ul>
                </div>
            </main>
        );
    }
}

export default Main;
