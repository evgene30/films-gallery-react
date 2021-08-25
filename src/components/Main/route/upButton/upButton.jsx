import React, { useState } from "react";
import { useEffect } from "react";
import { ReactComponent as UpSVG } from "assets/svg/up.svg";
import { CSSTransition } from "react-transition-group";
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
                const scrollTop = event.target.scrollingElement.scrollTop; // координаты прокрутки страницы если нет touch
                setState({ scrollState: scrollTop });
            }
        });
        return () => setState(); // отписка от функции
    }, []);

    const scrollToTop = () => {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, c - c / 9); // чем больше число, тем плавнее прокрутка
        }
    };

    return (
        <CSSTransition
            in={state?.scrollState !== 0}
            timeout={500}
            classNames={"scroll"}
            mountOnEnter
            unmountOnExit
        >
            <div id="topButtom" title="Вверх" onClick={scrollToTop}>
                <UpSVG />
            </div>
        </CSSTransition>
    );
};

export default ButtonUp;
