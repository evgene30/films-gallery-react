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
                            massiveFilms[this.state.filmPage].map((item) => {
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
                        {massiveFilms.map((item, index) => {
                            return (<li tabIndex="0" key={index}
                                        className={index + 1 === this.state.filmPage ? "active" : ""}
                                        onClick={this.handleClick}
                            >
                                {index + 1}
                            </li>);
                        })}
                        <li tabIndex="0" className="nextclick mt" onClick={this.handleClick}>Next</li>
                    </ul>
                </div>
            </main>
        );
    }
}

export default Main;
