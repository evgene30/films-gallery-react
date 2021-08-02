import {Route, useParams} from "react-router-dom";
import Infofilm from "../Card/Infofilm/Infofilm";
import Editfilm from "../Editfilm/Editfilm";
import React from "react";
import {useSelector} from "react-redux";


export function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            render={props => (
                <route.component {...props} routes={route.routes}/>
            )}
        />
    );
}

export function Film() {
    const originalListFilms = useSelector((state) => state.stateApp.itemsFilm); // список всех фильмов
    let {id} = useParams();
    if (Number(id)) {
        return (
            originalListFilms
                .filter((item) => item.id === Number(id))
                .map((item) => <Infofilm key={item.id} item={item}/>)
        );
    } else {
        return (
            originalListFilms
                .filter((item) => item.id === id)
                .map((item) => <Infofilm key={item.id} item={item}/>)
        );
    }
}

export function Edit() {
    const originalListFilms = useSelector((state) => state.stateApp.itemsFilm); // список всех фильмов
    let {id} = useParams();
    if (Number(id)) {
        return (
            originalListFilms
                .filter((item) => item.id === Number(id))
                .map((item) => {
                    return (
                        <Editfilm key={item.id} item={item}/>
                    );
                })
        )
    } else {
        return (
            originalListFilms
                .filter((item) => item.id === id)
                .map((item) => {
                    return (
                        <Editfilm key={item.id} item={item}/>
                    );
                })
        )
    }
}
