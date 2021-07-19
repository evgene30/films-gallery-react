export const selectFilms = (count, listFilms) => {
    const sortState = [...listFilms];

    switch (count) {
        case "id":
            sortState.sort(function (a, b) {
                return b.id - a.id;
            });
            break;
        case "popularity":
            sortState.sort(function (a, b) {
                return b.popularity - a.popularity;
            });
            break;
        case "vote_average":
            sortState.sort(function (a, b) {
                return b.vote_average - a.vote_average;
            });
            break;
        case "vote_count":
            sortState.sort(function (a, b) {
                return b.vote_count - a.vote_count;
            });
            break;
        case "release_date":
            sortState.sort(function (a, b) {
                return new Date(b.release_date) - new Date(a.release_date);
            });
            break;
        default:
            sortState.sort(function (a, b) {
                return b.id - a.id;
            });
    }
    return sortState;
};
