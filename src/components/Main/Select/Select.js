import {nanoid} from "nanoid";

const Select = (props) => {
    const {handleSortFilmSelect, checkSelect} = props;
    const sortingSelect = [
        {indexValue: "id", indexName: "Выберите фильтр..."},
        {indexValue: "popularity", indexName: "Популярность"},
        {indexValue: "vote_average", indexName: "Рейтинг"},
        {indexValue: "vote_count", indexName: "Количество голосов"},
        {indexValue: "release_date", indexName: "Дата релиза"}
    ];

    const handleChangeSelect = (event) => {
        handleSortFilmSelect(event.target.value); // забираем значение select
    };

    return (
        <form name="sort_list" id="filter" action="#">
            <select
                name="sortList"
                className="select-css"
                id="filters"
                onChange={handleChangeSelect}
                value={checkSelect}
            >
                {sortingSelect.map((item) => {
                    return <option key={nanoid()} value={item.indexValue}>{item.indexName}</option>;
                })}
            </select>
        </form>
    )
}

export default Select;
