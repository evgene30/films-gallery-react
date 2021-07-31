import {errorLoad, filmsLoad, preloader} from "../actions/actions";
import {getTrailer} from "./getVideo";

export const getFilms = (dispatch) => {
    dispatch(preloader(true));
    const filmList =
        "https://api.themoviedb.org/3/list/7095647?api_key=833e2dd8979208fbee927efb619ed90a&language=ru-RU"; // список фильмов

    fetch(filmList)
        .then((response) => response.json())
        .then((value) => {
            dispatch(filmsLoad(value.items));
            getTrailer(value.items.map((item) => item.id), dispatch); // формирование и передача id всех фильмов
        })
        .catch((error) => {
            dispatch(errorLoad(String(error)));
        })
        .finally(() => {
            dispatch(preloader(false));
        })
}
