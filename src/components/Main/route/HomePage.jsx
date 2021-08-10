import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import NoteFoundPage from "./NoteFoundPage";
import React from "react";

export default function HomePage() {
    const originalListFilms = useSelector((state) => state.stateApp.itemsFilm); // список всех фильмов
    const massiveFilms = packMassiveFilm(originalListFilms); // список рассортированных для пагинации фильмов
    const { page = 0 } = useParams();

    function packMassiveFilm(array) {
        // разбиваем исходный массив на вложенные массивы по 20 вложенных массивов для пагинации
        const massiveFilmsNew = [];
        for (let i = 0; i < Math.ceil(array.length / 20); i++) {
            massiveFilmsNew[i] = array.slice(i * 20, i * 20 + 20);
        }
        return massiveFilmsNew;
    }

    if (page < 21 && page >= 0) {
        return (
            <div>
                <ul className="ul-movies" id="sectionmov">
                    {massiveFilms[page]?.map((item) => (
                        <Card key={item.id} itemCard={item} />
                    ))}
                </ul>
                <Pagination
                    massiveFilms={massiveFilms} // список сортированных фильмов
                />
            </div>
        );
    }
    return <NoteFoundPage />;
}
