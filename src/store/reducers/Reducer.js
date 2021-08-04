import {
    ADD_FILM,
    IS_FILMS_LOADING,
    REMOVE_FILM,
    FILMS_LOAD,
    ERROR_LOAD,
    LOAD_GENRIS,
    FILM_ID,
    SELECT_FILTER,
    USER_STATUS,
} from "../constans/const";

const initialState = {
    preloader: false,
    itemsFilm: [], // не сортированный список фильмов
    error: null,
    filmId: "",
    filmCheck: false,
    genrisFilms: [],
    user: [],
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FILM:
            return {
                ...state,
                itemsFilm: action.payload,
            };

        case REMOVE_FILM:
            return {
                ...state,
                itemsFilm: state.itemsFilm.filter(
                    (el) => el.id !== action.payload
                ),
            };

        case IS_FILMS_LOADING:
            return {
                ...state,
                preloader: action.payload,
            };

        case FILMS_LOAD:
            return {
                ...state,
                itemsFilm: action.payload,
            };

        case SELECT_FILTER:
            return {
                ...state,
                checkSelect: action.payload,
            };

        case LOAD_GENRIS:
            return {
                ...state,
                genrisFilms: action.payload,
            };

        case ERROR_LOAD:
            return {
                ...state,
                error: action.payload,
            };

        case USER_STATUS:
            return {
                ...state,
                user: action.payload,
            };

        case FILM_ID:
            return {
                ...state,
                filmId: action.payload,
            };

        default:
            return state;
    }
};

export default Reducer;
