import { loadTrailers } from "../actions/actions";
import binarySearch from "./binarySearch";

export const getTrailer = (idItemsList, dispatch) => {
    const errorList = [
        120168, 64011, 93484, 81094, 73126, 128146, 2902, 2396, 4549, 6395,
    ];
    const video = new Map();

    idItemsList.forEach((id) => {
        if (!binarySearch(errorList, id)) {
            // проверка бинарным поиском наличия элемента в массиве
            fetch(
                `https://api.themoviedb.org/3/movie/${id}/videos?api_key=833e2dd8979208fbee927efb619ed90a&language=ru-RU`
            )
                .then((response) => response.json())
                .then((data) => data.results)
                .then((item) => {
                    for (const i in item) {
                        video.set(id, item[i]?.key);
                    }
                })
                .then(() => {
                    dispatch(loadTrailers(video));
                });
        }
    });
};
