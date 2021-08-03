import {useParams} from "react-router-dom";
import Infofilm from "../Card/Infofilm/Infofilm";
import Editfilm from "../Editfilm/Editfilm";
import React from "react";
import {useSelector} from "react-redux";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import NoteFoundPage from "../route/NoteFoundPage";


export function Film() {
    const originalListFilms = useSelector((state) => state.stateApp.itemsFilm); // список всех фильмов
    let {id} = useParams();


    if (Number(id)) {
        const filmOpen = originalListFilms.filter((item) => item.id === Number(id));
        if (filmOpen.length !== 0) {
            return (
                filmOpen.map((item) => <Infofilm key={item.id} item={item}/>)
            )
        }
        return <NoteFoundPage/>;

    } else {
        const filmOpen = originalListFilms.filter((item) => item.id === id);
        if (filmOpen.length !== 0) {
            return (
                filmOpen.map((item) => <Infofilm key={item.id} item={item}/>)
            )
        }
        return <NoteFoundPage/>;
    }
}

export function Edit() {
    const originalListFilms = useSelector((state) => state.stateApp.itemsFilm); // список всех фильмов
    const {id} = useParams();

    if (Number(id)) {
        const filmEdit = originalListFilms.filter((item) => item.id === Number(id));
        if (filmEdit.length !== 0) {
            return (
                filmEdit.map((item) => {
                    return (
                        <Editfilm key={item.id} item={item}/>
                    );
                })
            )
        }
        return <NoteFoundPage/>;
    } else {
        const filmEdit = originalListFilms.filter((item) => item.id === id);
        if (filmEdit.length !== 0) {
            return (
                filmEdit
                    .map((item) => {
                        return (
                            <Editfilm key={item.id} item={item}/>
                        );
                    })
            )
        }
        return <NoteFoundPage/>;
    }
}

export function HomePage() {
    const filmPage = useSelector((state) => state.stateApp.filmPage); // отправляем страницу пагинации
    const originalListFilms = useSelector((state) => state.stateApp.itemsFilm); // список всех фильмов
    const massiveFilms = packMassiveFilm(originalListFilms); // список рассортированных для пагинации фильмов


    function packMassiveFilm(array) {
        // разбиваем исходный массив на вложенные массивы по 20 вложенных массивов для пагинации
        const massiveFilmsNew = [];
        for (let i = 0; i < Math.ceil(array.length / 20); i++) {
            massiveFilmsNew[i] = array.slice(i * 20, i * 20 + 20);
        }
        return massiveFilmsNew;
    }

    return (
        <div>
            <ul className="ul-movies" id="sectionmov">
                {
                    massiveFilms[filmPage]?.map((item) => <Card key={item.id} itemCard={item}/>)
                }
            </ul>
            <Pagination
                massiveFilms={massiveFilms} // список сортированных фильмов
            />
        </div>
    )
}
