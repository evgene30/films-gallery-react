import {useHistory} from "react-router-dom";
import closeImg from "../../../assets/png/close.png";
import "./Addfilm.scss";


const Addfilm = (props) => {
    const history = useHistory();

    const handleClickClose = () => {
        history.push('./');
        props.handleMarkCard(false);
    }


    return (
        <div className="addfilm" id="addfilm">
            <img className="close" alt="Close" src={closeImg} onClick={handleClickClose}
                 style={{height: "40px", width: "40px"}}/>

            <form className="form_add" id="addform">
                <label>Добавление нового фильма:</label>
                <input type="text" name="add_title" placeholder="Название" required id="title_add" minLength="3"/>
                <textarea id="textarea_add" name="story" rows="5" cols="33" placeholder="Введите описание фильма..."
                          required minLength="6" maxLength="150"/>
                <label>Изображение в формате "/name.jpeg"</label>
                <input id="file-input" type="text" name="file" required placeholder="Вставьте ссылку на изображение"
                       minLength="3"/>
                <input type="number" name="number_add" placeholder="Популярность" required id="number_add"/>
                <input type="date" id="date_add" name="date_input" required style={{border: "none"}}/>
                <select className="add_select" multiple size="3" name="select_add" id="select_add">
                    <option disabled>Выберите 3 жанра</option>
                </select>
                <input type="number" name="average_add" placeholder="Рейтинг" required id="average_add"/>
                <input type="number" name="count_add" placeholder="Количество голосов" required
                       id="count_add"/>
                <label>Adult
                    <input type="checkbox" className="custom-checkbox" id="check_add" required/>
                </label>
                <button className="sendfilm" type="submit" name="form_auth_submit" id="sendfilm">Добавить
                </button>
                <button className="sendfilm" type="reset" id="clearBtn">Очистить</button>
            </form>
        </div>
    );
};

export default Addfilm;
