import {
    ADD_FILM,
    REMOVE_FILM,
    IS_FILMS_LOADING,
    FILMS_LOAD,
    ERROR_LOAD,
    LOAD_GENRIS,
    LOAD_TRAILERS,
    FILM_PAGE,
    FILM_ID,
    SELECT_FILTER,
    FILM_CHECK,
    USER_STATUS,
} from "../constans/const";

import { getFilms } from "../servises/getFilms";
import { getGenris } from "../servises/getGenris";
import { getTrailer } from "../servises/getVideo";
import { delCardPOST } from "../servises/postDelFilm";

export const addFilm = (value) => ({
    type: ADD_FILM,
    payload: value,
});

export const delFilm = (value) => ({
    type: REMOVE_FILM,
    payload: delCardPOST(value),
});

export const usersStatus = (value) => ({
    type: USER_STATUS,
    payload: value,
});

export const preloader = (value) => ({
    type: IS_FILMS_LOADING,
    payload: value,
});

export const filmPage = (value) => ({
    type: FILM_PAGE,
    payload: value,
});

export const filmChecks = (value) => ({
    type: FILM_CHECK,
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

export const newListFilms = () => (dispatch) => {
    dispatch(preloader(true));
    getFilms()
        .then((value) => {
            dispatch({
                type: FILMS_LOAD,
                payload: value.items,
            });
        })
        .then(() => {
            dispatch(preloader(false));
        })
        .catch((error) => {
            dispatch({
                type: ERROR_LOAD,
                payload: error,
            });
        });
};

export const genrisFilms = () => (dispatch) => {
    getGenris()
        .then((data) => {
            dispatch({
                type: LOAD_GENRIS,
                payload: data.genres,
            });
        })
        .catch((error) => {
            dispatch({
                type: ERROR_LOAD,
                payload: error,
            });
        });
};

export const traller = (id) => (dispatch) => {
    getTrailer(id).then((data) => {
        dispatch({
            type: LOAD_TRAILERS,
            payload: {
                id: data.id,
                key: data.results?.map((item) => item.key),
            },
        });
    });
};
