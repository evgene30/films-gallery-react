import {ADD_FILM, REMOVE_FILM, IS_FILMS_LOADING, FILMS_LOAD} from "../constans/const";
import {getFilms} from "../servises/get";

export const addFilm = (value) => ({
    type: ADD_FILM,
    payload: value,
});

export const delFilm = (value) => ({
    type: REMOVE_FILM,
    payload: value,
});


export const preloader = (value) => ({
    type: IS_FILMS_LOADING,
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
};


