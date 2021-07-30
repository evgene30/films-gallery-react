const binarySearch = (massive, item) => {
    let min = 0; // минимальный индекс массива
    let max = massive.length - 1; // максимальный индекс массива

    if (typeof massive[0] === "string" || typeof massive[0] === "number") {
        massive.sort((a, b) => a - b); // сортируем массив если состоит из строк
    } else if (typeof massive[0] === "object") {
        massive.sort((a, b) => a.id - b.id); // сортируем массив если состоит из объектов
    }

    while (min <= max) {
        const midlleIndex = Math.floor((min + max) / 2); // вычисленный средний индекс элемента

        if (typeof massive[0] === "object") {
            if (massive[midlleIndex].id === item) {
                return massive[midlleIndex];
            } else if (massive[midlleIndex].id > item) {
                max = midlleIndex - 1;
            } else {
                min = midlleIndex + 1;
            }
        }

        if (typeof massive[0] === "string" || typeof massive[0] === "number") {
            if (massive[midlleIndex] === item) {
                console.log(
                    `Искомый элемент "${massive[midlleIndex]}" находится в массиве под индексом "${midlleIndex}"`
                );
                return midlleIndex;
            } else if (massive[midlleIndex] > item) {
                max = midlleIndex - 1;
            } else {
                min = midlleIndex + 1;
            }
        }
    }
    return false;
};

export default binarySearch;
