import { nanoid } from "nanoid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilm, selectFilter } from "../../../store/actions/actions";
import { selectFilms } from "./selectFilms";

const Select = () => {
    const dispatch = useDispatch(); // функция захвата экшена
    const checkSelect = useSelector((state) => state.stateApp.checkSelect); // запись выбранного фильтра (название)
    const itemsFilm = useSelector((state) => state.stateApp.itemsFilm); // список всех фильмов
    const sortingSelect = [
        { indexValue: "id", indexName: "Выберите фильтр..." },
        { indexValue: "popularity", indexName: "Популярность" },
        { indexValue: "vote_average", indexName: "Рейтинг" },
        { indexValue: "vote_count", indexName: "Количество голосов" },
        { indexValue: "release_date", indexName: "Дата релиза" },
    ];

    const handleChangeSelect = (event) => {
        // сортировка фильмов через Select
        dispatch(selectFilter(event.target.value)); // записываем название фильтра в стейт
        dispatch(addFilm(selectFilms(event.target.value, itemsFilm))); // обработка логики сортировки перед записью в стейт
    };

    return (
        <form name="sort_list" id="filter" action="#">
            <select
                name="sortList"
                className="select-css"
                id="filters"
                onChange={handleChangeSelect}
                value={checkSelect}
            >
                {sortingSelect.map((item) => {
                    return (
                        <option key={nanoid()} value={item.indexValue}>
                            {item.indexName}
                        </option>
                    );
                })}
            </select>
        </form>
    );
};

export default Select;
