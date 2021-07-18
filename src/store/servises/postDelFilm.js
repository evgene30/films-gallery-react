export const delCardPOST = (id) => {

    if (typeof id === "number") {

        const postId = {
            media_id: Number(id),
        };
        fetch(
            "https://api.themoviedb.org/3/list/7095647/remove_item?api_key=833e2dd8979208fbee927efb619ed90a&session_id=b5ac2e7a824e2eff35e3f452706116df7525a037",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(postId),
            }
        ).then((response) => {
            response.json();
        });
        return id

    } else {
        return id
    }

};

