import React, { useState } from "react";
import { useEffect } from "react";
import { ReactComponent as UpSVG } from "assets/svg/up.svg";
import "./upButton.scss";

const ButtonUp = () => {
    const [state, setState] = useState({
        scrollState: 0,
    });

    useEffect(() => {
        window.addEventListener("scroll", function (event) {
            if ("ontouchstart" in window || window.DocumentTouch) {
                // проверка на наличие touch
                setState({ scrollState: 0 });
            } else {
                const scrollTop = event.target.scrollingElement.scrollTop; // координаты прокрутки страницы
                setState({ scrollState: scrollTop });
            }
        });
        return () => setState(); // отписка от функции
    }, []);

    function upPage() {
        // document.querySelector("body").animate({ scrollTop: 0 }, 700);
        window.scrollTo(0, 0);
    }

    return (
        <div
            id="topButtom"
            title="Вверх"
            onClick={upPage}
            style={
                state?.scrollState !== 0
                    ? { display: "inline-block" }
                    : { display: "none" }
            }
        >
            <UpSVG />
        </div>
    );
};

export default ButtonUp;
