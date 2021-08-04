import Reducer from "../reducers/Reducer";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import logger from "../middleware/logger";
import thunk from "redux-thunk";

const composedEnhancer = compose(applyMiddleware(logger, thunk));
const comboReducer = combineReducers({
    stateApp: Reducer,
});

const store = createStore(comboReducer, composedEnhancer);

export default store;
