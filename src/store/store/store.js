import Reducer from "../reducers/Reducer";
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import logger from "../middleware/logger";
import thunk from "redux-thunk";

const composedEnhancer = compose(applyMiddleware(logger, thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const comboReducer = combineReducers({
    stateApp: Reducer,
});

const store = createStore(
    comboReducer,
    composedEnhancer
);

export default store;
