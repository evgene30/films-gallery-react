import React, {Component} from 'react';
import "./Main.scss";


class Main extends Component {

    render() {
        return (
            <main id="firstmain">

                <section className="section-header">
                    <form name="sort_list" id="filter" action="#">

                        <select name="sortList" className="select-css" id="filters">
                            <option value="id">Выберите фильтр...</option>
                            <option value="popularity">Популярность</option>
                            <option value="vote_average">Рейтинг</option>
                            <option value="vote_count">Количество голосов</option>
                            <option value="release_date">Дата релиза</option>
                        </select>

                    </form>
                    <div className="adminbtn"/>

                </section>
                <section className="section-movies">
                    <ul className="ul-movies" id="sectionmov">

                    </ul>
                </section>

                <div className="pagination-block">
                    <ul className="pagination" id="pagination">

                    </ul>
                </div>

            </main>

        );
    }
}

export default Main;
