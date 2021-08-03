import React from "react";
import "./Main.scss";
import {Route, Switch} from "react-router-dom";
import {Link} from "react-router-dom";
import Select from "./Select/Select";
import {useSelector} from "react-redux";
import {HomePage, Film, Edit} from "./route/route"
import Addfilm from "./Addfilm/Addfilm";
import NoteFoundPage from "./route/NoteFoundPage";
import Register from "./Register/Register";


const Main = () => {
    const infoUser = useSelector((state) => state.stateApp.user); // авторизированный пользователь
    const newStyle = infoUser.status === "admin" ? {background: "#8080ff"} : {}; // изменение фона для Админа


    return (
        <main id="firstmain" style={newStyle}>
            <section className="section-header">
                {/*блок выбора фильтра*/}
                <Select/>
                {infoUser.status === "admin" && (
                    <div className="adminbtn">
                        <Link to="newfilm">
                            <button
                                className="buttonAdmin"
                                title="Добавить видео"
                                tabIndex="0"
                                id="adminbutton"
                            >
                                Add
                            </button>
                        </Link>
                    </div>
                )}
            </section>
            <section className="section-movies">
                <Switch>
                    <Route exact path="/"><HomePage/></Route>
                    <Route exact strict path="/edit/newfilm"><Addfilm/></Route>
                    <Route exact strict path="/newfilm"><Addfilm /></Route>
                    <Route exact strict path="/register"><Register/></Route>
                    <Route exact path="/:id"><Film/></Route>
                    <Route exact path="/edit/:id"><Edit/></Route>
                    <NoteFoundPage/>
                </Switch>
            </section>
        </main>
    );
}

export default Main;
