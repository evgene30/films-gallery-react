import { useParams } from "react-router-dom";
import Infofilm from "../Card/Infofilm/Infofilm";
import React from "react";
import { useSelector } from "react-redux";
import NoteFoundPage from "./NoteFoundPage";

export default function ListFilm() {
    const originalListFilms = useSelector((state) => state.stateApp.itemsFilm); // список всех фильмов
    let { id } = useParams();

    if (Number(id)) {
        const filmOpen = originalListFilms.filter(
            (item) => item.id === Number(id)
        );
        if (filmOpen.length !== 0) {
            return filmOpen.map((item) => (
                <Infofilm key={item.id} item={item} />
            ));
        }
        return <NoteFoundPage />;
    } else {
        const filmOpen = originalListFilms.filter((item) => item.id === id);
        if (filmOpen.length !== 0) {
            return filmOpen.map((item) => (
                <Infofilm key={item.id} item={item} />
            ));
        }
        return <NoteFoundPage />;
    }
}



