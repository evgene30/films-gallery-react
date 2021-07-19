import "./Pagination.scss";
import {useDispatch, useSelector} from "react-redux";
import {filmPage} from "../../../store/actions/actions";

const Pagination = (props) => {
    const {massiveFilms} = props;
    const dispatch = useDispatch(); // функция захвата объекта
    const filmPages = useSelector((state) => state.stateApp.filmPage);
    const user = useSelector((state) => state.stateApp.user); // авторизированный пользователь
    const styleVisible = user.status === "admin" ? {background: "#8080ff"} : {}; // изменение фона для Админа


    const handleClick = (event) => {
        const filmsState = Number([filmPages].map((elem) => elem));

        if (event.target.innerText === "Prev" && filmsState !== 0) {
            dispatch(filmPage(filmsState - 1));
        } else if (event.target.innerText === "Next" && filmsState !== 20) {
            dispatch(filmPage(filmsState + 1));
        } else if (Number(event.target.innerText)) {
            dispatch(filmPage(Number(event.target.innerText === '1' ? '0' : event.target.innerText)));
        } else {
            dispatch(filmPage(filmPages));
        }
    };

    const handleVisualPagination = (index) => {
        const selectPage = Number(filmPages);
        switch (selectPage >= 0 && selectPage <= 20) {
            case selectPage >= 0 && selectPage <= 4 && index > 0 && index < 5:
                return {display: "flex"};
            case selectPage >= 5 && selectPage < 8 && index > 2 && index < 8:
                return {display: "flex"};
            case selectPage >= 8 && selectPage < 11 && index > 5 && index < 11:
                return {display: "flex"};
            case selectPage >= 11 && selectPage < 14 && index > 8 && index < 14:
                return {display: "flex"};
            case selectPage >= 14 &&
            selectPage < 17 &&
            index > 11 &&
            index < 17:
                return {display: "flex"};
            case selectPage >= 17 &&
            selectPage <= 20 &&
            index > 14 &&
            index < 19:
                return {display: "flex"};
            default:
                return {display: "none"};
        }
    };

    return (
        <div className="pagination-block" style={styleVisible}>
            {/*блок отрисовки пагинации*/}
            <ul className="pagination" id="pagination">
                <li tabIndex="0" className="nextclick mt" onClick={handleClick}>
                    Prev
                </li>
                <li
                    tabIndex="0"
                    className={filmPages === 0 ? "active" : ""}
                    onClick={handleClick}
                >
                    1
                </li>
                {massiveFilms.map((item, index) => {
                    return (
                        <li
                            tabIndex="0"
                            key={index}
                            className={index + 1 === filmPages ? "active" : ""}
                            onClick={handleClick}
                            style={handleVisualPagination(index)}
                        >
                            {index + 1}
                        </li>
                    );
                })}
                <li
                    tabIndex="0"
                    className={filmPages === 20 ? "active" : ""}
                    onClick={handleClick}
                >
                    20
                </li>
                <li tabIndex="0" className="nextclick mt" onClick={handleClick}>
                    Next
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
