export const newFilms = (object, listFilms) => {

    const oldArray = [...listFilms];
    if (oldArray.find((item) => item.id !== object.id)) {
        const newArray = oldArray.filter((item) => object.id !== item.id);
        newArray.unshift(object);

        return newArray;
    } else {
        const newArray = oldArray.map((item) => item);
        newArray.unshift(object);

        return newArray;
    }

};
