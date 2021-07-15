const Pagination = (props) => {

    const {styleVisible, filmPage, massiveFilms, handleUpdatefilmPage} = props;

    const handleClick = (event) => {
        const filmsState = Number([filmPage].map((elem) => elem));

        if (event.target.innerText === "Prev" && filmsState !== 0) {
            handleUpdatefilmPage(filmsState - 1);
        } else if (event.target.innerText === "Next" && filmsState !== 20) {
            handleUpdatefilmPage(filmsState + 1);
        } else if (Number(event.target.innerText)) {
            handleUpdatefilmPage(Number(event.target.innerText));
        } else {
            handleUpdatefilmPage(filmPage);
        }
    };

    const handleVisualPagination = (index) => {
        const selectPage = Number(filmPage);
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
                <li
                    tabIndex="0"
                    className="nextclick mt"
                    onClick={handleClick}
                >
                    Prev
                </li>
                <li
                    tabIndex="0"
                    className={
                        filmPage === 1 ? "active" : ""
                    }
                    onClick={handleClick}
                >
                    1
                </li>
                {massiveFilms.map((item, index) => {
                    return (
                        <li
                            tabIndex="0"
                            key={index}
                            className={
                                index + 1 === filmPage
                                    ? "active"
                                    : ""
                            }
                            onClick={handleClick}
                            style={handleVisualPagination(index)}
                        >
                            {index + 1}
                        </li>
                    );
                })}
                <li
                    tabIndex="0"
                    className={
                        filmPage === 20 ? "active" : ""
                    }
                    onClick={handleClick}
                >
                    20
                </li>
                <li
                    tabIndex="0"
                    className="nextclick mt"
                    onClick={handleClick}
                >
                    Next
                </li>
            </ul>
        </div>


    )
}

export default Pagination;
