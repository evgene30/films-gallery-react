import "./Pagination.scss";
import React from "react";
import {useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";


const Pagination = (props) => {
    const {massiveFilms} = props;
    const user = useSelector((state) => state.stateApp.user); // авторизированный пользователь
    const styleVisible =
        user.status === "admin" ? {background: "#8080ff"} : {}; // изменение фона для Админа
    let {page = 0} = useParams();


    const handleVisualPagination = (index) => {
        const selectPage = Number(page);

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
                <Link to={`/page/${page - 1 < 0 ? 0 : page - 1}`}>
                    <li tabIndex="0" className="nextclick mt">
                        Prev
                    </li>
                </Link>

                <Link to={`/page/${0}`}>
                    <li
                        tabIndex="0"
                        className={Number(page) === 0 ? "active" : ""}
                        id="0"
                    >
                        1
                    </li>
                </Link>
                {massiveFilms.map((item, index) => {
                    return (
                        <li
                            id={index + 1}
                            tabIndex="0"
                            key={index}
                            className={index + 1 === Number(page) ? "active" : ""}
                            style={handleVisualPagination(index)}
                        >
                            <Link to={`/page/${index + 1}`}>
                                {index + 1}
                            </Link>
                        </li>
                    );
                })}
                <Link to={`/page/${20}`}>
                    <li
                        tabIndex="0"
                        className={Number(page) === 20 ? "active" : ""}
                        id="20"
                    >
                        20
                    </li>
                </Link>
                <Link to={`/page/${Number(page) >= 20 ? 20 : Number(page) + 1}`}>
                    <li tabIndex="0" className="nextclick mt">
                        Next
                    </li>
                </Link>
            </ul>

        </div>
    )
        ;
};

export default Pagination;
