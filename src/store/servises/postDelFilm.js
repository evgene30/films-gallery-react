import {errorLoad} from "../actions/actions";


export const delCardPOST = (id, dispatch) => {
    if (typeof id === "number") { // производим проверку типа id (определяем отправлять ли запрос на сервер)
        // если число отправляем на удаление
        fetch(
            "https://api.themoviedb.org/3/list/7095647/remove_item?api_key=833e2dd8979208fbee927efb619ed90a&session_id=b5ac2e7a824e2eff35e3f452706116df7525a037",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({media_id: Number(id)}),
            }
        )
            .catch((response) => {
                if (response.status) {
                    if (response.status !== 200) {
                        const error = `${response.status}, сбой удаления, попробуйте заново...`
                        dispatch(errorLoad(error));
                    }
                } else {
                    dispatch(errorLoad("нет связи с сервером"))
                }
            })
        return id;  // передаем id число для удаления из нашего массива
    } else {
        // если строковый тип - передаем далее для удаления фильма из массива без запроса к серверу
        return id;
    }
};


