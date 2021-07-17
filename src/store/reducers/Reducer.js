import {ADD_FILM, IS_FILMS_LOADING, REMOVE_FILM, FILMS_LOAD} from "../constans/const";

const initialState = {
    preloader: false,
    itemsFilm: [], // не сортированный список фильмов
    error: null,
    filmPage: 0,
    filmId: "",
    filmCheck: false,
    checkSelect: "",
    genrisFilms: [],
    videoTrailer: new Map(),
    user: [],
};

const Reducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_FILM:
            const oldArray = [...state.itemsFilm];
            const newArray = oldArray.filter((item) => action.id !== item.id);
            if (oldArray.find((item) => item.id !== action.id)) {
                return {
                    ...newArray, //новый массив
                    data: [...newArray, action.payload], // добавляем в него объект и возвращаем
                };
            } else {
                return {
                    ...newArray, // новый массив
                    data: [...newArray, action.payload], // добавляем в него объект и возвращаем
                };
            }

        case REMOVE_FILM:
            return {
                ...state,
                data: state.itemsFilm.filter((el) => el.id !== action.payload),
            };

        case IS_FILMS_LOADING:
            return {
                ...state,
                preloader: action.payload,
            }
        case FILMS_LOAD:
            return {
                ...state,
                itemsFilm: action.payload,
            }
        default:
            return state;
    }

};

export default Reducer;
