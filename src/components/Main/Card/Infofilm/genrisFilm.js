export const handleGenriFilm = (genriFilm, genrisFilms) => {
    const genri = genriFilm; // жанр отдельно взятого фильма
    const listAllgenri = [...genrisFilms]; // список всех жанров
    const cardGenri = new Map(listAllgenri.map((item) => [item.id, item])); // создаем карту объектов
    if (genri) {
        if (typeof genri === "string") {
            return genri;
        } else {
            const Genri = genri.map((item) => cardGenri.get(item)?.name);
            return Genri.join();
        }
    } else {
        return "";
    }
};
