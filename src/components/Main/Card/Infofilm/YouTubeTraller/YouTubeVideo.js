import React, {useEffect, useState} from "react";


const YouTubeVideo = ({id}) => {
    const [state, setState] = useState({
        link: "",
    });

    useEffect(() => {
        if (typeof id === "number") {
            fetch(
                `https://api.themoviedb.org/3/movie/${id}/videos?api_key=833e2dd8979208fbee927efb619ed90a&language=ru-RU`
            )
                .then((response) => response.json())
                .then((data) => data.results)
                .then((item) => {
                    if (typeof item === "object") {
                        setState({link: item[0]?.key});
                    }
                });
        }
        return "";
    }, [id]);

    if (state.link) {
        return (
            <div className="film-block__video">
                <iframe
                    id="ytplayer"
                    title="frame"
                    type="text/html"
                    src={`https://www.youtube.com/embed/${state.link}`}
                    allow="fullscreen"
                />
            </div>
        );
    }
    return <div className="film-block__video" style={{height: "23.4vh"}}/>;
};

export default YouTubeVideo;
