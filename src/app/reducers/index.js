import { combineReducers } from "redux";
import TestReducer from "./Reducer";

export default combineReducers({
    test: (...args) => new TestReducer().call(...args),
})

