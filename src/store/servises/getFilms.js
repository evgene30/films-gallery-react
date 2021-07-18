const filmList = "https://api.themoviedb.org/3/list/7095647?api_key=833e2dd8979208fbee927efb619ed90a&language=ru-RU"; // список фильмов
export const getFilms = () => fetch(filmList)
    .then((response) => response.json())






