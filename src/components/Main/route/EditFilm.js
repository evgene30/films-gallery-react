import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import Editfilm from "../Editfilm/Editfilm";
import NoteFoundPage from "./NoteFoundPage";
import React from "react";

export default function Edit() {
    const originalListFilms = useSelector((state) => state.stateApp.itemsFilm); // список всех фильмов
    const { id } = useParams();

    if (Number(id)) {
        const filmEdit = originalListFilms.filter(
            (item) => item.id === Number(id)
        );
        if (filmEdit.length !== 0) {
            return filmEdit.map((item) => {
                return <Editfilm key={item.id} item={item} />;
            });
        }
        return <NoteFoundPage />;
    } else {
        const filmEdit = originalListFilms.filter((item) => item.id === id);
        if (filmEdit.length !== 0) {
            return filmEdit.map((item) => {
                return <Editfilm key={item.id} item={item} />;
            });
        }
        return <NoteFoundPage />;
    }
}
