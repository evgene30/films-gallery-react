import React from "react";
import { useHistory } from "react-router-dom";
import "./NoteFoundPage.scss";
import NoteFound from "assets/png/404.png";
import closeImg from "assets/png/close.png";

const NoteFoundPage = () => {
    const history = useHistory();
    const handleClickClose = () => {
        history.push("../../");
    };

    return (
        <div className="imageError">
            <img
                className="close"
                alt="Close"
                src={closeImg}
                onClick={handleClickClose}
                style={{ height: "40px", width: "40px" }}
            />
            <div>
                <h1 className="errorText">
                    Cтраница не найдена либо была удалена... :(
                </h1>
                <img src={NoteFound} alt="404" className="responsive" />
            </div>
        </div>
    );
};

export default NoteFoundPage;
