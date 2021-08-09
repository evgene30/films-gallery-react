export const postRatingFim = (id, rating) => fetch(
    `https://api.themoviedb.org/3/movie/${id}/rating?api_key=833e2dd8979208fbee927efb619ed90a&session_id=b5ac2e7a824e2eff35e3f452706116df7525a037`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(rating),
    }
)
    .then((response) => response.json())
    .then((result) => {
        if (
            result.status_message ===
            "The item/record was updated successfully."
        ) {
            return ({
                message:
                    "Вы уже голосовали. Ваш голос успешно обновлен.",
            });
        } else if (result.status_message === "Success.") {
            return ({ message: "Ваш голос отправлен на сервер!" });
        } else {
            return ({ message: "Ошибка запроса" });
        }
    })
    .catch((error) => {
        return ({ message: error });
    });
