import {
    ADD_FILM,
    REMOVE_FILM,
    IS_FILMS_LOADING,
    FILMS_LOAD,
    ERROR_LOAD,
    LOAD_GENRIS,
    FILM_ID,
    SELECT_FILTER,
    USER_STATUS,
} from "../constans/const";

import {getFilms} from "../servises/getFilms";
import {getGenris} from "../servises/getGenris";
import {delCardPOST} from "../servises/postDelFilm";

export const addFilm = (value) => ({
    type: ADD_FILM,
    payload: value,
});


export const delFilm = (value, dispatch) => ({
    type: REMOVE_FILM,
    payload: delCardPOST(value, dispatch),
});

export const usersStatus = (value) => ({
    type: USER_STATUS,
    payload: value,
});

export const errorLoad = (value) => ({
    type: ERROR_LOAD,
    payload: value,
});

export const preloader = (value) => ({
    type: IS_FILMS_LOADING,
    payload: value,
});

export const filmID = (value) => ({
    type: FILM_ID,
    payload: value,
});

export const selectFilter = (value) => ({
    type: SELECT_FILTER,
    payload: value,
});

export const filmsLoad = (value) => ({
    type: FILMS_LOAD,
    payload: value,
});

export const loadGenris = (value) => ({
    type: LOAD_GENRIS,
    payload: value,
});

export const getListFilms = () => (dispatch) => getFilms(dispatch); // асинхронный запрос списка фильмов с сервера
export const getGenrisFilms = () => (dispatch) => getGenris(dispatch); // асинхронный запрос списка жанров фильмов с сервера
