export const getTrailer = (id) =>
    fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=833e2dd8979208fbee927efb619ed90a&language=ru-RU`
    ).then((response) => response.json());
