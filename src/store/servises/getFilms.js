import {errorLoad, filmsLoad, preloader} from "../actions/actions";

export const getFilms = (dispatch) => {
    dispatch(preloader(true));
    const filmList =
        "https://api.themoviedb.org/3/list/7095647?api_key=833e2dd8979208fbee927efb619ed90a&language=ru-RU"; // список фильмов

    fetch(filmList)
        .then((response) => response.json())
        .then((value) => {
            dispatch(filmsLoad(value.items));
        })
        .catch((error) => {
            dispatch(errorLoad(String(error)));
        })
        .finally(() => {
            dispatch(preloader(false));
        })
}
