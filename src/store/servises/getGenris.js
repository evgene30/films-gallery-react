import {errorLoad, loadGenris} from "../actions/actions";

const genriFilm =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=833e2dd8979208fbee927efb619ed90a&language=ru-RU"; // список жанров
export const getGenris = (dispatch) =>
    fetch(genriFilm).then((response) => response.json())
        .then((data) => {
            dispatch(loadGenris(data.genres));
        })
        .catch((error) => {
            dispatch(errorLoad(String(error)));
        });
